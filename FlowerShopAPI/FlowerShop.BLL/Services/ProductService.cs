using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using FlowerShop.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.BLL.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _repository;
        private readonly IRepository<Category> _categoryRepo;

        public ProductService(IRepository<Product> repository, IRepository<Category> categoryRepo)
        {
            _repository = repository;
            _categoryRepo = categoryRepo;
        }

        public async Task<IEnumerable<Product>> GetFeaturedAsync(int count)
        {
            return await _repository.GetQuery()
                .Where(p => p.IsActive && (p.IsFeatured || p.Badge == "hot"))
                .Include(p => p.Category)
                .OrderByDescending(p => p.SoldQuantity)
                .Take(count)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetNewAsync(int count)
        {
            return await _repository.GetQuery()
                .Where(p => p.IsActive && p.IsNew)
                .Include(p => p.Category)
                .OrderByDescending(p => p.CreatedDate)
                .Take(count)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetBestSellingAsync(int count)
        {
            return await _repository.GetQuery()
                .Where(p => p.IsActive && p.SoldQuantity > 100)
                .Include(p => p.Category)
                .OrderByDescending(p => p.SoldQuantity)
                .Take(count)
                .ToListAsync();
        }

        public async Task<Product?> GetDetailAsync(int id)
        {
            return await _repository.GetQuery()
                .Include(p => p.Category)
                .Include(p => p.Reviews).ThenInclude(r => r.User)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Product>> SearchAsync(string keyword)
        {
            return await _repository.GetQuery()
                .Where(p => p.IsActive && p.ProductName.Contains(keyword))
                .Include(p => p.Category)
                .OrderByDescending(p => p.CreatedDate)
                .ToListAsync();
        }

        public async Task<(IEnumerable<Product> Items, int TotalCount)> GetPagedAsync(
            int page, int pageSize, int? categoryId, string? catSlug, string? keyword, string? sort, string? filter)
        {
            var query = _repository.GetQuery().Where(p => p.IsActive).Include(p => p.Category).AsQueryable();

            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId.Value);

            if (!string.IsNullOrEmpty(catSlug))
                query = query.Where(p => p.Category.Slug == catSlug);

            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(p => p.ProductName.Contains(keyword));

            if (filter == "sale")
                query = query.Where(p => p.SalePrice != null);

            int totalCount = await query.CountAsync();

            query = sort switch
            {
                "price_asc" => query.OrderBy(p => p.SalePrice ?? p.Price),
                "price_desc" => query.OrderByDescending(p => p.SalePrice ?? p.Price),
                "sold" => query.OrderByDescending(p => p.SoldQuantity),
                "name_asc" => query.OrderBy(p => p.ProductName),
                "name_desc" => query.OrderByDescending(p => p.ProductName),
                _ => query.OrderByDescending(p => p.CreatedDate)
            };

            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return (items, totalCount);
        }

        public async Task<IEnumerable<Product>> GetRelatedAsync(int productId, int categoryId, int count)
        {
            return await _repository.GetQuery()
                .Where(p => p.IsActive && p.CategoryId == categoryId && p.Id != productId)
                .Include(p => p.Category)
                .OrderByDescending(p => p.SoldQuantity)
                .Take(count)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _repository.GetQuery().Include(p => p.Category).OrderByDescending(p => p.CreatedDate).ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task CreateAsync(Product product)
        {
            product.CreatedDate = DateTime.Now;
            await _repository.AddAsync(product);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateAsync(Product product)
        {
            product.UpdatedDate = DateTime.Now;
            _repository.Update(product);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity != null)
            {
                _repository.Delete(entity);
                await _repository.SaveChangesAsync();
            }
        }

        public async Task<int> GetCountAsync()
        {
            return await _repository.GetQuery().CountAsync();
        }
    }
}
