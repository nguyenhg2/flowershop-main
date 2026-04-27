using FlowerShop.API.DTOs;
using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.API.Controllers
{
    [ApiController]
    [Route("api/contacts")]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ContactDto dto)
        {
            var contact = new Contact { FullName = dto.Name, Email = dto.Email, Phone = dto.Phone, Subject = dto.Subject, Message = dto.Message };
            await _contactService.CreateAsync(contact);
            return Ok(new { message = "Đã gửi tin nhắn thành công" });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contacts = await _contactService.GetAllAsync();
            return Ok(contacts);
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkRead(int id)
        {
            await _contactService.MarkAsReadAsync(id);
            return Ok(new { message = "Đã đánh dấu đã đọc" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _contactService.DeleteAsync(id);
            return Ok(new { message = "Đã xóa liên hệ" });
        }
    }
}
