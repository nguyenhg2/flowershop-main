using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using FlowerShop.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _repository;

        public UserService(IRepository<User> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _repository.GetQuery().OrderByDescending(u => u.CreatedDate).ToListAsync();
        }

        public async Task<(IEnumerable<User> Items, int TotalCount)> GetPagedAsync(int page, int pageSize, string? keyword)
        {
            var query = _repository.GetQuery().AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(u => u.FullName.Contains(keyword) || u.Email.Contains(keyword));
            int totalCount = await query.CountAsync();
            var items = await query.OrderByDescending(u => u.CreatedDate).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return (items, totalCount);
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task ToggleActiveAsync(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user != null)
            {
                user.IsActive = !user.IsActive;
                user.UpdatedDate = DateTime.Now;
                _repository.Update(user);
                await _repository.SaveChangesAsync();
            }
        }

        public async Task<int> GetCountAsync()
        {
            return await _repository.GetQuery().CountAsync(u => u.Role == "Customer");
        }
    }
}
