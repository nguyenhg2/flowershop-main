using FlowerShop.BLL.Interfaces;
using FlowerShop.DAL.Models;
using FlowerShop.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.BLL.Services
{
    public class ContactService : IContactService
    {
        private readonly IRepository<Contact> _repository;

        public ContactService(IRepository<Contact> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Contact>> GetAllAsync()
        {
            return await _repository.GetQuery().OrderByDescending(c => c.CreatedDate).ToListAsync();
        }

        public async Task<Contact?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task CreateAsync(Contact contact)
        {
            contact.CreatedDate = DateTime.Now;
            await _repository.AddAsync(contact);
            await _repository.SaveChangesAsync();
        }

        public async Task MarkAsReadAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity != null)
            {
                entity.IsRead = true;
                entity.UpdatedDate = DateTime.Now;
                _repository.Update(entity);
                await _repository.SaveChangesAsync();
            }
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

        public async Task<int> GetUnreadCountAsync()
        {
            return await _repository.GetQuery().CountAsync(c => !c.IsRead);
        }
    }
}
