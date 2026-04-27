using FlowerShop.DAL.Models;

namespace FlowerShop.BLL.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetAllAsync();
        Task<Contact?> GetByIdAsync(int id);
        Task CreateAsync(Contact contact);
        Task MarkAsReadAsync(int id);
        Task DeleteAsync(int id);
        Task<int> GetUnreadCountAsync();
    }
}
