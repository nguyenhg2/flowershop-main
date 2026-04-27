using FlowerShop.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.DAL.Data
{
    public class FlowerShopDbContext : DbContext
    {
        public FlowerShopDbContext(DbContextOptions<FlowerShopDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(e =>
            {
                e.HasIndex(u => u.Email).IsUnique();
            });

            modelBuilder.Entity<Category>(e =>
            {
                e.HasIndex(c => c.Slug).IsUnique();
            });

            modelBuilder.Entity<Product>(e =>
            {
                e.HasOne(p => p.Category)
                    .WithMany(c => c.Products)
                    .HasForeignKey(p => p.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Order>(e =>
            {
                e.HasOne(o => o.User)
                    .WithMany(u => u.Orders)
                    .HasForeignKey(o => o.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<OrderDetail>(e =>
            {
                e.HasOne(od => od.Order)
                    .WithMany(o => o.OrderDetails)
                    .HasForeignKey(od => od.OrderId)
                    .OnDelete(DeleteBehavior.Cascade);

                e.HasOne(od => od.Product)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(od => od.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Review>(e =>
            {
                e.HasOne(r => r.Product)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(r => r.ProductId)
                    .OnDelete(DeleteBehavior.Cascade);

                e.HasOne(r => r.User)
                    .WithMany(u => u.Reviews)
                    .HasForeignKey(r => r.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, CategoryName = "Hoa Sinh Nhật", Slug = "birthday", Emoji = "\U0001F382", Color = "#f7d6df", SortOrder = 1 },
                new Category { Id = 2, CategoryName = "Hoa Khai Trương", Slug = "opening", Emoji = "\U0001F3EE", Color = "#fff0d6", SortOrder = 2 },
                new Category { Id = 3, CategoryName = "Lan Hồ Điệp", Slug = "orchid", Emoji = "\U0001F338", Color = "#ede6ff", SortOrder = 3 },
                new Category { Id = 4, CategoryName = "Hoa Cưới", Slug = "wedding", Emoji = "\U0001F48D", Color = "#d6f0f7", SortOrder = 4 },
                new Category { Id = 5, CategoryName = "Hoa Tang Lễ", Slug = "condolence", Emoji = "\U0001F54A\uFE0F", Color = "#e8e8e8", SortOrder = 5 },
                new Category { Id = 6, CategoryName = "Hoa Tình Yêu", Slug = "love", Emoji = "\u2764\uFE0F", Color = "#ffd6d6", SortOrder = 6 }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, ProductName = "Bó Hoa Hồng Đỏ Tình Yêu", CategoryId = 6, Price = 450000, SalePrice = 380000, Img = "\U0001F339", Rating = 4.8m, ReviewCount = 124, SoldQuantity = 312, Badge = "hot", IsNew = false, StockQuantity = 50, Description = "Bó hoa hồng đỏ tươi cao cấp, 20 bông hoa hồng Đà Lạt kết hợp lá xanh sang trọng. Phù hợp làm quà tặng người yêu nhân ngày Valentine, kỷ niệm." },
                new Product { Id = 2, ProductName = "Giỏ Hoa Sinh Nhật Pastel", CategoryId = 1, Price = 650000, SalePrice = 550000, Img = "\U0001F337", Rating = 4.9m, ReviewCount = 89, SoldQuantity = 201, Badge = "sale", IsNew = false, StockQuantity = 30, Description = "Giỏ hoa sinh nhật tone pastel nhẹ nhàng với hoa cúc, hoa hồng phấn, lisianthus. Màu sắc tươi vui, thích hợp cho mọi lứa tuổi." },
                new Product { Id = 3, ProductName = "Lan Hồ Điệp Trắng Tinh Khôi", CategoryId = 3, Price = 1200000, Img = "\U0001F338", Rating = 5.0m, ReviewCount = 56, SoldQuantity = 98, IsNew = true, StockQuantity = 20, Description = "Chậu lan hồ điệp trắng cao cấp, 2 cành 12-15 bông. Chăm sóc kỹ lưỡng, hoa tươi lâu 30-45 ngày. Sang trọng, thanh lịch." },
                new Product { Id = 4, ProductName = "Hoa Khai Trương May Mắn", CategoryId = 2, Price = 2500000, SalePrice = 2200000, Img = "\U0001F3F5\uFE0F", Rating = 4.7m, ReviewCount = 43, SoldQuantity = 87, Badge = "sale", IsNew = false, StockQuantity = 15, Description = "Kệ hoa khai trương 2 tầng rực rỡ, mang ý nghĩa may mắn, thịnh vượng. Kết hợp hoa cúc, hồng, cát tường màu đỏ-vàng." },
                new Product { Id = 5, ProductName = "Bó Hoa Cưới Cô Dâu", CategoryId = 4, Price = 800000, Img = "\U0001F490", Rating = 4.9m, ReviewCount = 112, SoldQuantity = 234, Badge = "hot", IsNew = false, StockQuantity = 25, Description = "Bó cầm tay cô dâu sang trọng với hoa hồng trắng, baby breath, phong lan trắng. Kết hợp ribbon lụa cao cấp." },
                new Product { Id = 6, ProductName = "Hoa Hướng Dương Rực Rỡ", CategoryId = 1, Price = 350000, SalePrice = 300000, Img = "\U0001F33B", Rating = 4.6m, ReviewCount = 78, SoldQuantity = 156, Badge = "sale", IsNew = true, StockQuantity = 40, Description = "Bó hoa hướng dương tươi sáng, mang năng lượng tích cực. Kết hợp lá xanh tươi, gói giấy kraft thân thiện." },
                new Product { Id = 7, ProductName = "Giỏ Hoa Chia Buồn", CategoryId = 5, Price = 500000, Img = "\U0001F54A\uFE0F", Rating = 4.5m, ReviewCount = 34, SoldQuantity = 67, IsNew = false, StockQuantity = 20, Description = "Giỏ hoa tang lễ trang nhã, màu trắng và tím nhạt. Thể hiện sự tôn trọng và chia sẻ nỗi đau với gia đình." },
                new Product { Id = 8, ProductName = "Bó Hoa Tulip Hà Lan", CategoryId = 6, Price = 520000, SalePrice = 460000, Img = "\U0001F337", Rating = 4.8m, ReviewCount = 67, SoldQuantity = 143, Badge = "new", IsNew = true, StockQuantity = 35, Description = "Bó tulip nhập khẩu Hà Lan đủ màu sắc: đỏ, vàng, tím, hồng. Hoa tươi nhập về 3 lần/tuần." },
                new Product { Id = 9, ProductName = "Lan Hồ Điệp Tím Hoàng Gia", CategoryId = 3, Price = 1500000, Img = "\U0001F33A", Rating = 4.9m, ReviewCount = 29, SoldQuantity = 54, IsNew = true, StockQuantity = 15, Description = "Chậu lan hồ điệp tím cao cấp, 2 cành 10-12 bông. Màu tím quý phái, phù hợp làm quà biếu." },
                new Product { Id = 10, ProductName = "Kệ Hoa Khai Trương Vạn Phát", CategoryId = 2, Price = 3500000, SalePrice = 3000000, Img = "\U0001F33C", Rating = 4.8m, ReviewCount = 21, SoldQuantity = 45, Badge = "sale", IsNew = false, StockQuantity = 10, Description = "Kệ hoa khai trương cao cấp 3 tầng, thiết kế hoành tráng. Toàn hoa tươi nhập khẩu, đảm bảo tươi 5-7 ngày." },
                new Product { Id = 11, ProductName = "Hoa Hồng Vàng Sang Trọng", CategoryId = 6, Price = 680000, Img = "\U0001F33C", Rating = 4.7m, ReviewCount = 45, SoldQuantity = 98, IsNew = false, StockQuantity = 20, Description = "Bó hoa hồng vàng 15 bông, tượng trưng cho tình yêu vĩnh cửu và sự trân trọng. Kết hợp gypsophila trắng." },
                new Product { Id = 12, ProductName = "Giỏ Hoa Sinh Nhật VIP", CategoryId = 1, Price = 1200000, SalePrice = 980000, Img = "\U0001F381", Rating = 5.0m, ReviewCount = 38, SoldQuantity = 72, Badge = "hot", IsNew = false, StockQuantity = 15, Description = "Giỏ hoa sinh nhật cao cấp kết hợp hoa và chocolate Ferrero Rocher, gấu bông dễ thương. Món quà hoàn hảo." }
            );

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, FullName = "Quản Trị Viên", Email = "admin@monglan.vn", Phone = "0901234567", PasswordHash = "9dlUIpr23JllA57gEZDzjA==.ZDSPh7tTKI3JWMPRxXklhXac8/oS+PPmYxvKlRDDxRY=", Role = "Admin", IsActive = true },
                new User { Id = 2, FullName = "Nguyễn Văn Kiểm Thử", Email = "test@monglan.vn", Phone = "0909876543", PasswordHash = "62JkwKPjjiNSuEX+PK1pkw==.nk3d07hgqb4iwNsWNGwrKPqVtItNWzueXf0fNFp10HE=", Address = "123 Nguyễn Huệ, Quận 1, TP.HCM", Role = "Customer", IsActive = true }
            );

            modelBuilder.Entity<Banner>().HasData(
                new Banner { Id = 1, Title = "Valentine 2024", Subtitle = "Ưu đãi đặc biệt - Giảm 20% tất cả hoa hồng", Background = "linear-gradient(135deg,#c84b6b,#8b2d47)", CtaText = "Mua Ngay", IsActive = true, SortOrder = 1 },
                new Banner { Id = 2, Title = "Khai Xuân Giáp Thìn", Subtitle = "Miễn phí giao hàng cho đơn từ 500k", Background = "linear-gradient(135deg,#c9973a,#8b6520)", CtaText = "Khám Phá", IsActive = true, SortOrder = 2 },
                new Banner { Id = 3, Title = "Lan Hồ Điệp Mới Về", Subtitle = "Hàng nhập khẩu chính hãng, giá tốt nhất", Background = "linear-gradient(135deg,#4a7c59,#2d5a3a)", CtaText = "Xem Ngay", IsActive = true, SortOrder = 3 }
            );

            modelBuilder.Entity<Review>().HasData(
                new Review { Id = 1, ProductId = 1, UserId = 2, Stars = 5, Text = "Hoa rất đẹp, tươi lâu, đóng gói cẩn thận. Giao nhanh trong 2h. Sẽ ủng hộ dài dài!", CreatedDate = new DateTime(2024, 1, 15) },
                new Review { Id = 2, ProductId = 1, UserId = 2, Stars = 4, Text = "Hoa đẹp, màu sắc chuẩn như ảnh. Hơi trễ so với giờ hẹn 30 phút nhưng thông cảm được.", CreatedDate = new DateTime(2024, 1, 10) },
                new Review { Id = 3, ProductId = 3, UserId = 2, Stars = 5, Text = "Lan đẹp tuyệt vời! Mua tặng sếp nhân ngày khai trương, được khen ngợi nhiều. Rất hài lòng!", CreatedDate = new DateTime(2024, 1, 20) }
            );
        }
    }
}
