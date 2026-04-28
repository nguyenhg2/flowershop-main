using FlowerShop.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlowerShop.DAL.Models
{
    public class Product : BaseEntity
    {
        [Required]
        [MaxLength(200)]
        public string ProductName { get; set; } = "";

        public string? Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? SalePrice { get; set; }

        [MaxLength(255)]
        public string? ImageUrl { get; set; }

        public int CategoryId { get; set; }
        public int StockQuantity { get; set; } = 0;
        public int SoldQuantity { get; set; } = 0;

        [Column(TypeName = "decimal(3,1)")]
        public decimal Rating { get; set; } = 0;

        public int ReviewCount { get; set; } = 0;

        [MaxLength(20)]
        public string? Badge { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsNew { get; set; } = false;
        public bool IsFeatured { get; set; } = false;

        public virtual Category Category { get; set; } = null!;
        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
