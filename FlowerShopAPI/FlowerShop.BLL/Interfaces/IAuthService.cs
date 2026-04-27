using FlowerShop.DAL.Models;

namespace FlowerShop.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<User?> LoginAsync(string email, string password);
        Task<bool> RegisterAsync(string fullName, string email, string phone, string password);
        Task<bool> IsEmailExistAsync(string email);
        Task<User?> GetUserByIdAsync(int userId);
        Task UpdateProfileAsync(User user);
        Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword);
    }
}
