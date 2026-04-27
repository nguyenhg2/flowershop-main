using FlowerShop.API.DTOs;
using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.API.Controllers
{
    [ApiController]
    [Route("api/reviews")]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetByProduct(int productId)
        {
            var reviews = await _reviewService.GetByProductIdAsync(productId);
            return Ok(reviews.Select(r => new
            {
                id = r.Id, user = r.User.FullName, stars = r.Stars, date = r.CreatedDate.ToString("yyyy-MM-dd"),
                text = r.Text, avatar = r.User.FullName.Length > 0 ? r.User.FullName[0].ToString() : "?"
            }));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ReviewDto dto, [FromQuery] int userId)
        {
            var review = new Review { ProductId = dto.ProductId, UserId = userId, Stars = dto.Stars, Text = dto.Text };
            await _reviewService.CreateAsync(review);
            return Ok(new { message = "Đã gửi đánh giá thành công" });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _reviewService.GetAllAsync();
            return Ok(reviews.Select(r => new { id = r.Id, productName = r.Product.ProductName, user = r.User.FullName, stars = r.Stars, text = r.Text, date = r.CreatedDate.ToString("yyyy-MM-dd") }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _reviewService.DeleteAsync(id);
            return Ok(new { message = "Đã xóa đánh giá" });
        }
    }
}
