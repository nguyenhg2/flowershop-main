using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.API.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryService.GetActiveAsync();
            return Ok(categories.Select(c => new
            {
                id = c.Slug,
                dbId = c.Id,
                name = c.CategoryName,
                color = c.Color
            }));
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllAdmin()
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category category)
        {
            await _categoryService.CreateAsync(category);
            return Ok(new { message = "Da tao danh muc", id = category.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Category category)
        {
            category.Id = id;
            await _categoryService.UpdateAsync(category);
            return Ok(new { message = "Da cap nhat danh muc" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryService.DeleteAsync(id);
            return Ok(new { message = "Da xoa danh muc" });
        }
    }
}
