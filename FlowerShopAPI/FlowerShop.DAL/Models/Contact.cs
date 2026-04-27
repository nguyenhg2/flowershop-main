using FlowerShop.Common;
using System.ComponentModel.DataAnnotations;

namespace FlowerShop.DAL.Models
{
    public class Contact : BaseEntity
    {
        [MaxLength(100)]
        public string? FullName { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(15)]
        public string? Phone { get; set; }

        [MaxLength(200)]
        public string? Subject { get; set; }

        public string? Message { get; set; }
        public bool IsRead { get; set; } = false;
    }
}
