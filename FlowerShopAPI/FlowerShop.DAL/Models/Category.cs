using FlowerShop.Common;
using System.ComponentModel.DataAnnotations;

namespace FlowerShop.DAL.Models
{
    public class Category : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string CategoryName { get; set; } = "";

        [Required]
        [MaxLength(50)]
        public string Slug { get; set; } = "";

        [MaxLength(500)]
        public string? Description { get; set; }

        [MaxLength(20)]
        public string? Color { get; set; }

        [MaxLength(255)]
        public string? ImageUrl { get; set; }

        public bool IsActive { get; set; } = true;
        public int SortOrder { get; set; } = 0;

        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
