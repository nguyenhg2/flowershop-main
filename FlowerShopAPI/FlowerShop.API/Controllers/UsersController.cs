using FlowerShop.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.API.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? keyword, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var result = await _userService.GetPagedAsync(page, pageSize, keyword);
            return Ok(new
            {
                items = result.Items.Select(u => new { u.Id, name = u.FullName, u.Email, u.Phone, u.Role, u.IsActive, created = u.CreatedDate.ToString("dd/MM/yyyy") }),
                totalCount = result.TotalCount
            });
        }

        [HttpPut("{id}/toggle")]
        public async Task<IActionResult> Toggle(int id)
        {
            await _userService.ToggleActiveAsync(id);
            return Ok(new { message = "Đã thay đổi trạng thái tài khoản" });
        }
    }
}
