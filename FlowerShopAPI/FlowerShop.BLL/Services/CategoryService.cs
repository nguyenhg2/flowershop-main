using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using FlowerShop.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.BLL.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _repository;

        public CategoryService(IRepository<Category> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _repository.GetQuery().OrderBy(c => c.SortOrder).ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetActiveAsync()
        {
            return await _repository.GetQuery().Where(c => c.IsActive).OrderBy(c => c.SortOrder).ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task CreateAsync(Category category)
        {
            category.CreatedDate = DateTime.Now;
            await _repository.AddAsync(category);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateAsync(Category category)
        {
            category.UpdatedDate = DateTime.Now;
            _repository.Update(category);
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
    }
}
