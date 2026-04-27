using FlowerShop.API.DTOs;
using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.API.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? categoryId, [FromQuery] string? cat, [FromQuery] string? keyword, [FromQuery] string? sort, [FromQuery] string? filter, [FromQuery] int page = 1, [FromQuery] int pageSize = 12)
        {
            var result = await _productService.GetPagedAsync(page, pageSize, categoryId, cat, keyword, sort, filter);
            return Ok(new { items = result.Items.Select(MapProduct), totalCount = result.TotalCount, page, pageSize });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var p = await _productService.GetDetailAsync(id);
            if (p == null) return NotFound(new { message = "Không tìm thấy sản phẩm" });
            return Ok(MapProductDetail(p));
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeatured([FromQuery] int count = 8)
        {
            var products = await _productService.GetFeaturedAsync(count);
            return Ok(products.Select(MapProduct));
        }

        [HttpGet("new")]
        public async Task<IActionResult> GetNew([FromQuery] int count = 8)
        {
            var products = await _productService.GetNewAsync(count);
            return Ok(products.Select(MapProduct));
        }

        [HttpGet("bestselling")]
        public async Task<IActionResult> GetBestSelling([FromQuery] int count = 4)
        {
            var products = await _productService.GetBestSellingAsync(count);
            return Ok(products.Select(MapProduct));
        }

        [HttpGet("{id}/related")]
        public async Task<IActionResult> GetRelated(int id, [FromQuery] int count = 4)
        {
            var p = await _productService.GetByIdAsync(id);
            if (p == null) return NotFound(new { message = "Không tìm thấy sản phẩm" });
            var products = await _productService.GetRelatedAsync(id, p.CategoryId, count);
            return Ok(products.Select(MapProduct));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductDto dto)
        {
            var product = new Product
            {
                ProductName = dto.ProductName, Description = dto.Description, Price = dto.Price, SalePrice = dto.SalePrice,
                Img = dto.Img, ImageUrl = dto.ImageUrl, CategoryId = dto.CategoryId, StockQuantity = dto.StockQuantity,
                Badge = dto.Badge, IsNew = dto.IsNew, IsFeatured = dto.IsFeatured
            };
            await _productService.CreateAsync(product);
            return Ok(new { message = "Đã tạo sản phẩm", id = product.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductDto dto)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null) return NotFound(new { message = "Không tìm thấy sản phẩm" });

            product.ProductName = dto.ProductName; product.Description = dto.Description; product.Price = dto.Price;
            product.SalePrice = dto.SalePrice; product.Img = dto.Img; product.ImageUrl = dto.ImageUrl;
            product.CategoryId = dto.CategoryId; product.StockQuantity = dto.StockQuantity;
            product.Badge = dto.Badge; product.IsNew = dto.IsNew; product.IsFeatured = dto.IsFeatured;

            await _productService.UpdateAsync(product);
            return Ok(new { message = "Đã cập nhật sản phẩm" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productService.DeleteAsync(id);
            return Ok(new { message = "Đã xóa sản phẩm" });
        }

        private object MapProduct(Product p) => new
        {
            id = p.Id, name = p.ProductName, cat = p.Category?.Slug ?? "", price = p.Price, sale = p.SalePrice,
            img = p.Img, imageUrl = p.ImageUrl, rating = p.Rating, reviews = p.ReviewCount, sold = p.SoldQuantity,
            badge = p.Badge, desc = p.Description, isNew = p.IsNew, categoryId = p.CategoryId
        };

        private object MapProductDetail(Product p) => new
        {
            id = p.Id, name = p.ProductName, cat = p.Category?.Slug ?? "", price = p.Price, sale = p.SalePrice,
            img = p.Img, imageUrl = p.ImageUrl, rating = p.Rating, reviews = p.ReviewCount, sold = p.SoldQuantity,
            badge = p.Badge, desc = p.Description, isNew = p.IsNew, categoryId = p.CategoryId, stock = p.StockQuantity,
            reviewList = p.Reviews.Select(r => new
            {
                id = r.Id, user = r.User.FullName, stars = r.Stars, date = r.CreatedDate.ToString("yyyy-MM-dd"),
                text = r.Text, avatar = r.User.FullName.Length > 0 ? r.User.FullName[0].ToString() : "?"
            })
        };
    }
}
