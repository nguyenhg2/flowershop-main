using FlowerShop.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.API.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IProductService _productService;
        private readonly IUserService _userService;
        private readonly IContactService _contactService;

        public DashboardController(IOrderService orderService, IProductService productService, IUserService userService, IContactService contactService)
        {
            _orderService = orderService;
            _productService = productService;
            _userService = userService;
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(new
            {
                todayRevenue = await _orderService.GetTodayRevenueAsync(),
                monthRevenue = await _orderService.GetMonthRevenueAsync(),
                todayOrders = await _orderService.GetTodayOrderCountAsync(),
                monthOrders = await _orderService.GetMonthOrderCountAsync(),
                totalProducts = await _productService.GetCountAsync(),
                totalCustomers = await _userService.GetCountAsync(),
                unreadContacts = await _contactService.GetUnreadCountAsync()
            });
        }
    }
}
