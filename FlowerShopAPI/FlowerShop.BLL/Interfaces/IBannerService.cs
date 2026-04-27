using FlowerShop.DAL.Models;

namespace FlowerShop.BLL.Interfaces
{
    public interface IBannerService
    {
        Task<IEnumerable<Banner>> GetAllAsync();
        Task<IEnumerable<Banner>> GetActiveAsync();
        Task<Banner?> GetByIdAsync(int id);
        Task CreateAsync(Banner banner);
        Task UpdateAsync(Banner banner);
        Task DeleteAsync(int id);
    }
}
