using FlowerShop.Common;
using System.ComponentModel.DataAnnotations;

namespace FlowerShop.DAL.Models
{
    public class Banner : BaseEntity
    {
        [MaxLength(200)]
        public string? Title { get; set; }

        [MaxLength(500)]
        public string? Subtitle { get; set; }

        [MaxLength(200)]
        public string? Background { get; set; }

        [MaxLength(255)]
        public string? ImageUrl { get; set; }

        [MaxLength(100)]
        public string? CtaText { get; set; }

        [MaxLength(255)]
        public string? LinkUrl { get; set; }

        public bool IsActive { get; set; } = true;
        public int SortOrder { get; set; } = 0;
    }
}
