using FlowerShop.API.DTOs;
using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.API.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> Checkout([FromBody] CheckoutDto dto, [FromQuery] int userId)
        {
            var cartItems = dto.Items.Select(i => new CartItem
            {
                ProductId = i.Id,
                Quantity = i.Qty,
                Price = i.Price
            }).ToList();

            var order = new Order
            {
                UserId = userId,
                ReceiverName = dto.Name,
                ReceiverPhone = dto.Phone,
                ReceiverAddress = dto.Address,
                Note = dto.Note,
                PaymentMethod = dto.Payment
            };

            var created = await _orderService.CreateOrderAsync(order, cartItems);
            return Ok(new
            {
                id = "ML" + created.Id,
                date = created.OrderDate.ToString("dd/MM/yyyy"),
                total = created.TotalAmount,
                status = created.Status,
                message = "Dat hang thanh cong"
            });
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var orders = await _orderService.GetByUserIdAsync(userId);
            return Ok(orders.Select(o => new
            {
                id = "ML" + o.Id.ToString("D3"),
                date = o.OrderDate.ToString("dd/MM/yyyy"),
                total = o.TotalAmount,
                status = o.Status,
                address = o.ReceiverAddress,
                name = o.ReceiverName,
                phone = o.ReceiverPhone,
                payment = o.PaymentMethod,
                items = o.OrderDetails.Select(od => new
                {
                    id = od.ProductId,
                    name = od.Product.ProductName,
                    imageUrl = od.Product.ImageUrl,
                    price = od.UnitPrice,
                    qty = od.Quantity
                })
            }));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? status, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var result = await _orderService.GetPagedAsync(page, pageSize, status);
            return Ok(new
            {
                items = result.Items.Select(o => new
                {
                    id = o.Id,
                    displayId = "ML" + o.Id.ToString("D3"),
                    date = o.OrderDate.ToString("dd/MM/yyyy"),
                    total = o.TotalAmount,
                    status = o.Status,
                    customerName = o.User.FullName,
                    customerEmail = o.User.Email
                }),
                totalCount = result.TotalCount
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var o = await _orderService.GetDetailAsync(id);
            if (o == null) return NotFound(new { message = "Khong tim thay don hang" });
            return Ok(new
            {
                id = o.Id,
                displayId = "ML" + o.Id.ToString("D3"),
                date = o.OrderDate.ToString("dd/MM/yyyy"),
                total = o.TotalAmount,
                status = o.Status,
                name = o.ReceiverName,
                phone = o.ReceiverPhone,
                address = o.ReceiverAddress,
                note = o.Note,
                payment = o.PaymentMethod,
                customer = new { o.User.FullName, o.User.Email, o.User.Phone },
                items = o.OrderDetails.Select(od => new
                {
                    id = od.ProductId,
                    name = od.Product.ProductName,
                    imageUrl = od.Product.ImageUrl,
                    price = od.UnitPrice,
                    qty = od.Quantity,
                    subtotal = od.Subtotal
                })
            });
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] OrderDto dto)
        {
            await _orderService.UpdateStatusAsync(id, dto.Status);
            return Ok(new { message = "Da cap nhat trang thai don hang" });
        }

        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> Cancel(int id)
        {
            await _orderService.CancelOrderAsync(id);
            return Ok(new { message = "Da huy don hang" });
        }
    }
}
