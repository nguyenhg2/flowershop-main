using FlowerShop.Common;
using System.ComponentModel.DataAnnotations;

namespace FlowerShop.DAL.Models
{
    public class Review : BaseEntity
    {
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int Stars { get; set; }

        [MaxLength(1000)]
        public string? Text { get; set; }

        public virtual Product Product { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
