using FlowerShop.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlowerShop.DAL.Models
{
    public class Order : BaseEntity
    {
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "pending";

        [MaxLength(100)]
        public string? ReceiverName { get; set; }

        [MaxLength(15)]
        public string? ReceiverPhone { get; set; }

        [MaxLength(500)]
        public string? ReceiverAddress { get; set; }

        [MaxLength(500)]
        public string? Note { get; set; }

        [MaxLength(50)]
        public string? PaymentMethod { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
    