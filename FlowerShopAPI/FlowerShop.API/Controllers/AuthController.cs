using FlowerShop.API.DTOs;
using FlowerShop.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _authService.LoginAsync(dto.Email, dto.Password);
            if (user == null)
                return BadRequest(new { message = "Email hoặc mật khẩu không đúng" });

            return Ok(new
            {
                user = new { id = user.Id, name = user.FullName, email = user.Email, phone = user.Phone, role = user.Role }
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _authService.IsEmailExistAsync(dto.Email))
                return BadRequest(new { message = "Email đã tồn tại" });

            var result = await _authService.RegisterAsync(dto.Name, dto.Email, dto.Phone, dto.Password);
            if (!result)
                return BadRequest(new { message = "Đăng ký thất bại" });

            var user = await _authService.LoginAsync(dto.Email, dto.Password);
            return Ok(new
            {
                user = new { id = user!.Id, name = user.FullName, email = user.Email, phone = user.Phone, role = user.Role }
            });
        }

        [HttpPut("profile/{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateProfileDto dto)
        {
            var user = await _authService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "Không tìm thấy người dùng" });

            user.FullName = dto.Name;
            user.Email = dto.Email;
            user.Phone = dto.Phone;
            await _authService.UpdateProfileAsync(user);

            return Ok(new { id = user.Id, name = user.FullName, email = user.Email, phone = user.Phone });
        }

        [HttpPut("password/{id}")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordDto dto)
        {
            var result = await _authService.ChangePasswordAsync(id, dto.OldPassword, dto.NewPassword);
            if (!result)
                return BadRequest(new { message = "Mật khẩu hiện tại không đúng" });

            return Ok(new { message = "Đổi mật khẩu thành công" });
        }
    }
}
