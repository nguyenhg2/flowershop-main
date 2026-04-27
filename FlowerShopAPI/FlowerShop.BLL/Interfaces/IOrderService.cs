using FlowerShop.DAL.Models;

namespace FlowerShop.BLL.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(Order order, List<CartItem> cartItems);
        Task<IEnumerable<Order>> GetByUserIdAsync(int userId);
        Task<Order?> GetDetailAsync(int orderId);
        Task<IEnumerable<Order>> GetAllAsync();
        Task<(IEnumerable<Order> Items, int TotalCount)> GetPagedAsync(int page, int pageSize, string? status);
        Task UpdateStatusAsync(int orderId, string status);
        Task CancelOrderAsync(int orderId);
        Task<decimal> GetTodayRevenueAsync();
        Task<decimal> GetMonthRevenueAsync();
        Task<int> GetTodayOrderCountAsync();
        Task<int> GetMonthOrderCountAsync();
    }
}
