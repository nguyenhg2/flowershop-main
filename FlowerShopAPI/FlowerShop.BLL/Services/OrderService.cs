using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Data;
using FlowerShop.DAL.Models;
using FlowerShop.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.BLL.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order> _orderRepo;
        private readonly IRepository<Product> _productRepo;
        private readonly FlowerShopDbContext _context;

        public OrderService(IRepository<Order> orderRepo, IRepository<Product> productRepo, FlowerShopDbContext context)
        {
            _orderRepo = orderRepo;
            _productRepo = productRepo;
            _context = context;
        }

        public async Task<Order> CreateOrderAsync(Order order, List<CartItem> cartItems)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            order.OrderDate = DateTime.Now;
            order.CreatedDate = DateTime.Now;
            order.OrderDetails = new List<OrderDetail>();

            foreach (var item in cartItems)
            {
                order.OrderDetails.Add(new OrderDetail
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.Price,
                    Subtotal = item.Price * item.Quantity,
                    CreatedDate = DateTime.Now
                });

                var product = await _productRepo.GetByIdAsync(item.ProductId);
                if (product != null)
                {
                    product.StockQuantity -= item.Quantity;
                    product.SoldQuantity += item.Quantity;
                    _productRepo.Update(product);
                }
            }

            order.TotalAmount = order.OrderDetails.Sum(od => od.Subtotal);
            await _orderRepo.AddAsync(order);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return order;
        }

        public async Task<IEnumerable<Order>> GetByUserIdAsync(int userId)
        {
            return await _orderRepo.GetQuery()
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderDetails).ThenInclude(od => od.Product)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }

        public async Task<Order?> GetDetailAsync(int orderId)
        {
            return await _orderRepo.GetQuery()
                .Include(o => o.User)
                .Include(o => o.OrderDetails).ThenInclude(od => od.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _orderRepo.GetQuery().Include(o => o.User).OrderByDescending(o => o.OrderDate).ToListAsync();
        }

        public async Task<(IEnumerable<Order> Items, int TotalCount)> GetPagedAsync(int page, int pageSize, string? status)
        {
            var query = _orderRepo.GetQuery().Include(o => o.User).AsQueryable();
            if (!string.IsNullOrEmpty(status))
                query = query.Where(o => o.Status == status);
            int totalCount = await query.CountAsync();
            var items = await query.OrderByDescending(o => o.OrderDate).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return (items, totalCount);
        }

        public async Task UpdateStatusAsync(int orderId, string status)
        {
            var order = await _orderRepo.GetByIdAsync(orderId);
            if (order != null)
            {
                order.Status = status;
                order.UpdatedDate = DateTime.Now;
                _orderRepo.Update(order);
                await _orderRepo.SaveChangesAsync();
            }
        }

        public async Task CancelOrderAsync(int orderId)
        {
            var order = await _orderRepo.GetQuery().Include(o => o.OrderDetails).FirstOrDefaultAsync(o => o.Id == orderId);
            if (order != null && order.Status == "pending")
            {
                order.Status = "cancelled";
                order.UpdatedDate = DateTime.Now;
                foreach (var detail in order.OrderDetails)
                {
                    var product = await _productRepo.GetByIdAsync(detail.ProductId);
                    if (product != null)
                    {
                        product.StockQuantity += detail.Quantity;
                        product.SoldQuantity -= detail.Quantity;
                        _productRepo.Update(product);
                    }
                }
                _orderRepo.Update(order);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<decimal> GetTodayRevenueAsync()
        {
            var today = DateTime.Today;
            return await _orderRepo.GetQuery().Where(o => o.OrderDate.Date == today && o.Status != "cancelled").SumAsync(o => o.TotalAmount);
        }

        public async Task<decimal> GetMonthRevenueAsync()
        {
            var now = DateTime.Now;
            return await _orderRepo.GetQuery().Where(o => o.OrderDate.Month == now.Month && o.OrderDate.Year == now.Year && o.Status != "cancelled").SumAsync(o => o.TotalAmount);
        }

        public async Task<int> GetTodayOrderCountAsync()
        {
            return await _orderRepo.GetQuery().CountAsync(o => o.OrderDate.Date == DateTime.Today);
        }

        public async Task<int> GetMonthOrderCountAsync()
        {
            var now = DateTime.Now;
            return await _orderRepo.GetQuery().CountAsync(o => o.OrderDate.Month == now.Month && o.OrderDate.Year == now.Year);
        }
    }
}
