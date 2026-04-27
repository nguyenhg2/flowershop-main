using FlowerShop.DAL.Models;

namespace FlowerShop.BLL.Interfaces
{
    public interface IReviewService
    {
        Task<IEnumerable<Review>> GetByProductIdAsync(int productId);
        Task<IEnumerable<Review>> GetAllAsync();
        Task CreateAsync(Review review);
        Task DeleteAsync(int id);
    }
}
