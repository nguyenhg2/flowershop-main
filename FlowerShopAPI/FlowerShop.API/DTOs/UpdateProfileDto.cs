namespace FlowerShop.API.DTOs
{
    public class UpdateProfileDto
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string? Phone { get; set; }
    }
}
