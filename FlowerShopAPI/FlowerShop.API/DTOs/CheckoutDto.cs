namespace FlowerShop.API.DTOs
{
    public class CheckoutDto
    {
        public string Name { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Address { get; set; } = "";
        public string? Note { get; set; }
        public string Payment { get; set; } = "cod";
        public List<CheckoutItemDto> Items { get; set; } = new();
    }

    public class CheckoutItemDto
    {
        public int Id { get; set; }
        public int Qty { get; set; }
        public decimal Price { get; set; }
    }
}
