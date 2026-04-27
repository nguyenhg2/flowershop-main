using FlowerShop.BLL.Interfaces;
using FlowerShop.Common.Helpers;
using FlowerShop.DAL.Models;
using FlowerShop.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepository<User> _repository;

        public AuthService(IRepository<User> repository)
        {
            _repository = repository;
        }

        public async Task<User?> LoginAsync(string email, string password)
        {
            var user = await _repository.GetQuery().FirstOrDefaultAsync(u => u.Email == email && u.IsActive);
            if (user == null) return null;
            if (!PasswordHelper.VerifyPassword(password, user.PasswordHash)) return null;
            return user;
        }

        public async Task<bool> RegisterAsync(string fullName, string email, string phone, string password)
        {
            if (await IsEmailExistAsync(email)) return false;
            var user = new User
            {
                FullName = fullName,
                Email = email,
                Phone = phone,
                PasswordHash = PasswordHelper.HashPassword(password),
                Role = "Customer",
                IsActive = true,
                CreatedDate = DateTime.Now
            };
            await _repository.AddAsync(user);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsEmailExistAsync(string email)
        {
            return await _repository.GetQuery().AnyAsync(u => u.Email == email);
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _repository.GetByIdAsync(userId);
        }

        public async Task UpdateProfileAsync(User user)
        {
            user.UpdatedDate = DateTime.Now;
            _repository.Update(user);
            await _repository.SaveChangesAsync();
        }

        public async Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
        {
            var user = await _repository.GetByIdAsync(userId);
            if (user == null) return false;
            if (!PasswordHelper.VerifyPassword(oldPassword, user.PasswordHash)) return false;
            user.PasswordHash = PasswordHelper.HashPassword(newPassword);
            user.UpdatedDate = DateTime.Now;
            _repository.Update(user);
            await _repository.SaveChangesAsync();
            return true;
        }
    }
}
