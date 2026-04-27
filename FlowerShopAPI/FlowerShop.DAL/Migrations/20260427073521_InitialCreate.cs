using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FlowerShop.DAL.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Banners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Subtitle = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Background = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CtaText = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LinkUrl = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Emoji = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Color = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Role = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalePrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Img = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    StockQuantity = table.Column<int>(type: "int", nullable: false),
                    SoldQuantity = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<decimal>(type: "decimal(3,1)", nullable: false),
                    ReviewCount = table.Column<int>(type: "int", nullable: false),
                    Badge = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsNew = table.Column<bool>(type: "bit", nullable: false),
                    IsFeatured = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ReceiverName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ReceiverPhone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    ReceiverAddress = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Note = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Stars = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Banners",
                columns: new[] { "Id", "Background", "CreatedDate", "CtaText", "ImageUrl", "IsActive", "LinkUrl", "SortOrder", "Subtitle", "Title", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, "linear-gradient(135deg,#c84b6b,#8b2d47)", new DateTime(2026, 4, 27, 14, 35, 18, 901, DateTimeKind.Local).AddTicks(4289), "Mua Ngay", null, true, null, 1, "Ưu đãi đặc biệt - Giảm 20% tất cả hoa hồng", "Valentine 2024", null },
                    { 2, "linear-gradient(135deg,#c9973a,#8b6520)", new DateTime(2026, 4, 27, 14, 35, 18, 901, DateTimeKind.Local).AddTicks(4312), "Khám Phá", null, true, null, 2, "Miễn phí giao hàng cho đơn từ 500k", "Khai Xuân Giáp Thìn", null },
                    { 3, "linear-gradient(135deg,#4a7c59,#2d5a3a)", new DateTime(2026, 4, 27, 14, 35, 18, 901, DateTimeKind.Local).AddTicks(4315), "Xem Ngay", null, true, null, 3, "Hàng nhập khẩu chính hãng, giá tốt nhất", "Lan Hồ Điệp Mới Về", null }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CategoryName", "Color", "CreatedDate", "Description", "Emoji", "ImageUrl", "IsActive", "Slug", "SortOrder", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, "Hoa Sinh Nhật", "#f7d6df", new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6010), null, "🎂", null, true, "birthday", 1, null },
                    { 2, "Hoa Khai Trương", "#fff0d6", new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6033), null, "🏮", null, true, "opening", 2, null },
                    { 3, "Lan Hồ Điệp", "#ede6ff", new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6036), null, "🌸", null, true, "orchid", 3, null },
                    { 4, "Hoa Cưới", "#d6f0f7", new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6038), null, "💍", null, true, "wedding", 4, null },
                    { 5, "Hoa Tang Lễ", "#e8e8e8", new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6039), null, "🕊️", null, true, "condolence", 5, null },
                    { 6, "Hoa Tình Yêu", "#ffd6d6", new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6041), null, "❤️", null, true, "love", 6, null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedDate", "Email", "FullName", "IsActive", "PasswordHash", "Phone", "Role", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6453), "admin@monglan.vn", "Quản Trị Viên", true, "9dlUIpr23JllA57gEZDzjA==.ZDSPh7tTKI3JWMPRxXklhXac8/oS+PPmYxvKlRDDxRY=", "0901234567", "Admin", null },
                    { 2, "123 Nguyễn Huệ, Quận 1, TP.HCM", new DateTime(2026, 4, 27, 14, 35, 18, 888, DateTimeKind.Local).AddTicks(2994), "test@monglan.vn", "Nguyễn Văn Kiểm Thử", true, "62JkwKPjjiNSuEX+PK1pkw==.nk3d07hgqb4iwNsWNGwrKPqVtItNWzueXf0fNFp10HE=", "0909876543", "Customer", null }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Badge", "CategoryId", "CreatedDate", "Description", "ImageUrl", "Img", "IsActive", "IsFeatured", "IsNew", "Price", "ProductName", "Rating", "ReviewCount", "SalePrice", "SoldQuantity", "StockQuantity", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, "hot", 6, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6348), "Bó hoa hồng đỏ tươi cao cấp, 20 bông hoa hồng Đà Lạt kết hợp lá xanh sang trọng. Phù hợp làm quà tặng người yêu nhân ngày Valentine, kỷ niệm.", null, "🌹", true, false, false, 450000m, "Bó Hoa Hồng Đỏ Tình Yêu", 4.8m, 124, 380000m, 312, 50, null },
                    { 2, "sale", 1, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6363), "Giỏ hoa sinh nhật tone pastel nhẹ nhàng với hoa cúc, hoa hồng phấn, lisianthus. Màu sắc tươi vui, thích hợp cho mọi lứa tuổi.", null, "🌷", true, false, false, 650000m, "Giỏ Hoa Sinh Nhật Pastel", 4.9m, 89, 550000m, 201, 30, null },
                    { 3, null, 3, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6368), "Chậu lan hồ điệp trắng cao cấp, 2 cành 12-15 bông. Chăm sóc kỹ lưỡng, hoa tươi lâu 30-45 ngày. Sang trọng, thanh lịch.", null, "🌸", true, false, true, 1200000m, "Lan Hồ Điệp Trắng Tinh Khôi", 5.0m, 56, null, 98, 20, null },
                    { 4, "sale", 2, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6372), "Kệ hoa khai trương 2 tầng rực rỡ, mang ý nghĩa may mắn, thịnh vượng. Kết hợp hoa cúc, hồng, cát tường màu đỏ-vàng.", null, "🏵️", true, false, false, 2500000m, "Hoa Khai Trương May Mắn", 4.7m, 43, 2200000m, 87, 15, null },
                    { 5, "hot", 4, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6376), "Bó cầm tay cô dâu sang trọng với hoa hồng trắng, baby breath, phong lan trắng. Kết hợp ribbon lụa cao cấp.", null, "💐", true, false, false, 800000m, "Bó Hoa Cưới Cô Dâu", 4.9m, 112, null, 234, 25, null },
                    { 6, "sale", 1, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6379), "Bó hoa hướng dương tươi sáng, mang năng lượng tích cực. Kết hợp lá xanh tươi, gói giấy kraft thân thiện.", null, "🌻", true, false, true, 350000m, "Hoa Hướng Dương Rực Rỡ", 4.6m, 78, 300000m, 156, 40, null },
                    { 7, null, 5, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6382), "Giỏ hoa tang lễ trang nhã, màu trắng và tím nhạt. Thể hiện sự tôn trọng và chia sẻ nỗi đau với gia đình.", null, "🕊️", true, false, false, 500000m, "Giỏ Hoa Chia Buồn", 4.5m, 34, null, 67, 20, null },
                    { 8, "new", 6, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6385), "Bó tulip nhập khẩu Hà Lan đủ màu sắc: đỏ, vàng, tím, hồng. Hoa tươi nhập về 3 lần/tuần.", null, "🌷", true, false, true, 520000m, "Bó Hoa Tulip Hà Lan", 4.8m, 67, 460000m, 143, 35, null },
                    { 9, null, 3, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6389), "Chậu lan hồ điệp tím cao cấp, 2 cành 10-12 bông. Màu tím quý phái, phù hợp làm quà biếu.", null, "🌺", true, false, true, 1500000m, "Lan Hồ Điệp Tím Hoàng Gia", 4.9m, 29, null, 54, 15, null },
                    { 10, "sale", 2, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6392), "Kệ hoa khai trương cao cấp 3 tầng, thiết kế hoành tráng. Toàn hoa tươi nhập khẩu, đảm bảo tươi 5-7 ngày.", null, "🌼", true, false, false, 3500000m, "Kệ Hoa Khai Trương Vạn Phát", 4.8m, 21, 3000000m, 45, 10, null },
                    { 11, null, 6, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6395), "Bó hoa hồng vàng 15 bông, tượng trưng cho tình yêu vĩnh cửu và sự trân trọng. Kết hợp gypsophila trắng.", null, "🌼", true, false, false, 680000m, "Hoa Hồng Vàng Sang Trọng", 4.7m, 45, null, 98, 20, null },
                    { 12, "hot", 1, new DateTime(2026, 4, 27, 14, 35, 18, 874, DateTimeKind.Local).AddTicks(6398), "Giỏ hoa sinh nhật cao cấp kết hợp hoa và chocolate Ferrero Rocher, gấu bông dễ thương. Món quà hoàn hảo.", null, "🎁", true, false, false, 1200000m, "Giỏ Hoa Sinh Nhật VIP", 5.0m, 38, 980000m, 72, 15, null }
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "Id", "CreatedDate", "ProductId", "Stars", "Text", "UpdatedDate", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 5, "Hoa rất đẹp, tươi lâu, đóng gói cẩn thận. Giao nhanh trong 2h. Sẽ ủng hộ dài dài!", null, 2 },
                    { 2, new DateTime(2024, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 4, "Hoa đẹp, màu sắc chuẩn như ảnh. Hơi trễ so với giờ hẹn 30 phút nhưng thông cảm được.", null, 2 },
                    { 3, new DateTime(2024, 1, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 5, "Lan đẹp tuyệt vời! Mua tặng sếp nhân ngày khai trương, được khen ngợi nhiều. Rất hài lòng!", null, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_Slug",
                table: "Categories",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_OrderId",
                table: "OrderDetails",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ProductId",
                table: "OrderDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ProductId",
                table: "Reviews",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Banners");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "OrderDetails");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
