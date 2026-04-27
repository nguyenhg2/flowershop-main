namespace FlowerShop.API.DTOs
{
    public class ReviewDto
    {
        public int ProductId { get; set; }
        public int Stars { get; set; }
        public string? Text { get; set; }
    }
}
