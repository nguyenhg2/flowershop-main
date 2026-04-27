using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using FlowerShop.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.BLL.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IRepository<Review> _repository;

        public ReviewService(IRepository<Review> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Review>> GetByProductIdAsync(int productId)
        {
            return await _repository.GetQuery()
                .Where(r => r.ProductId == productId)
                .Include(r => r.User)
                .OrderByDescending(r => r.CreatedDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Review>> GetAllAsync()
        {
            return await _repository.GetQuery()
                .Include(r => r.User)
                .Include(r => r.Product)
                .OrderByDescending(r => r.CreatedDate)
                .ToListAsync();
        }

        public async Task CreateAsync(Review review)
        {
            review.CreatedDate = DateTime.Now;
            await _repository.AddAsync(review);
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
