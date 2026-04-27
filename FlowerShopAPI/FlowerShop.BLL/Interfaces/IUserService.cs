using FlowerShop.DAL.Models;

namespace FlowerShop.BLL.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<(IEnumerable<User> Items, int TotalCount)> GetPagedAsync(int page, int pageSize, string? keyword);
        Task<User?> GetByIdAsync(int id);
        Task ToggleActiveAsync(int id);
        Task<int> GetCountAsync();
    }
}
