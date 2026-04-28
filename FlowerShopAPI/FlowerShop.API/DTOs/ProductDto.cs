namespace FlowerShop.API.DTOs
{
    public class ProductDto
    {
        public string ProductName { get; set; } = "";
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public decimal? SalePrice { get; set; }
        public string? ImageUrl { get; set; }
        public int CategoryId { get; set; }
        public int StockQuantity { get; set; }
        public string? Badge { get; set; }
        public bool IsNew { get; set; }
        public bool IsFeatured { get; set; }
    }
}
