using FlowerShop.DAL.Models;

namespace FlowerShop.BLL.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetFeaturedAsync(int count);
        Task<IEnumerable<Product>> GetNewAsync(int count);
        Task<IEnumerable<Product>> GetBestSellingAsync(int count);
        Task<Product?> GetDetailAsync(int id);
        Task<IEnumerable<Product>> SearchAsync(string keyword);
        Task<(IEnumerable<Product> Items, int TotalCount)> GetPagedAsync(int page, int pageSize, int? categoryId, string? catSlug, string? keyword, string? sort, string? filter);
        Task<IEnumerable<Product>> GetRelatedAsync(int productId, int categoryId, int count);
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
        Task CreateAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);
        Task<int> GetCountAsync();
    }
}
    