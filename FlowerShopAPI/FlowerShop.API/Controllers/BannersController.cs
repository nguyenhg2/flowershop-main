using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.API.Controllers
{
    [ApiController]
    [Route("api/banners")]
    public class BannersController : ControllerBase
    {
        private readonly IBannerService _bannerService;

        public BannersController(IBannerService bannerService)
        {
            _bannerService = bannerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetActive()
        {
            var banners = await _bannerService.GetActiveAsync();
            return Ok(banners.Select(b => new
            {
                bg = b.Background,
                title = b.Title,
                sub = b.Subtitle,
                cta = b.CtaText,
                imageUrl = b.ImageUrl,
                linkUrl = b.LinkUrl
            }));
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var banners = await _bannerService.GetAllAsync();
            return Ok(banners);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Banner banner)
        {
            await _bannerService.CreateAsync(banner);
            return Ok(new { message = "Da tao banner", id = banner.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Banner banner)
        {
            banner.Id = id;
            await _bannerService.UpdateAsync(banner);
            return Ok(new { message = "Da cap nhat banner" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _bannerService.DeleteAsync(id);
            return Ok(new { message = "Da xoa banner" });
        }
    }
}
