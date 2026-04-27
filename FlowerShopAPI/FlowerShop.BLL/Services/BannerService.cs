using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using FlowerShop.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.BLL.Services
{
    public class BannerService : IBannerService
    {
        private readonly IRepository<Banner> _repository;

        public BannerService(IRepository<Banner> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Banner>> GetAllAsync()
        {
            return await _repository.GetQuery().OrderBy(b => b.SortOrder).ToListAsync();
        }

        public async Task<IEnumerable<Banner>> GetActiveAsync()
        {
            return await _repository.GetQuery().Where(b => b.IsActive).OrderBy(b => b.SortOrder).ToListAsync();
        }

        public async Task<Banner?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task CreateAsync(Banner banner)
        {
            banner.CreatedDate = DateTime.Now;
            await _repository.AddAsync(banner);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateAsync(Banner banner)
        {
            banner.UpdatedDate = DateTime.Now;
            _repository.Update(banner);
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
