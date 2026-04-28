-- Script tao database va seed data cho FlowerShop
-- Su dung voi SQL Server

USE master;
GO

-- Tao database neu chua ton tai
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'FlowerShop')
BEGIN
    CREATE DATABASE FlowerShop;
END
GO

USE FlowerShop;
GO

-- Tao bang Categories
CREATE TABLE Categories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL,
    Slug NVARCHAR(50) NOT NULL,
    Description NVARCHAR(500),
    Emoji NVARCHAR(10),
    Color NVARCHAR(20),
    ImageUrl NVARCHAR(255),
    IsActive BIT DEFAULT 1,
    SortOrder INT DEFAULT 0,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    UpdatedDate DATETIME2
);
GO

-- Tao index duy nhat cho Slug
CREATE UNIQUE INDEX IX_Categories_Slug ON Categories(Slug);
GO

-- Tao bang Users
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(15),
    PasswordHash NVARCHAR(255) NOT NULL,
    Address NVARCHAR(500),
    Role NVARCHAR(20) NOT NULL DEFAULT 'Customer',
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    UpdatedDate DATETIME2
);
GO

-- Tao index duy nhat cho Email
CREATE UNIQUE INDEX IX_Users_Email ON Users(Email);
GO

-- Tao bang Products
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductName NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(18,2) NOT NULL,
    SalePrice DECIMAL(18,2),
    ImageUrl NVARCHAR(255),
    Img NVARCHAR(10),
    CategoryId INT NOT NULL,
    StockQuantity INT DEFAULT 0,
    SoldQuantity INT DEFAULT 0,
    Rating DECIMAL(3,1) DEFAULT 0,
    ReviewCount INT DEFAULT 0,
    Badge NVARCHAR(20),
    IsActive BIT DEFAULT 1,
    IsNew BIT DEFAULT 0,
    IsFeatured BIT DEFAULT 0,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    UpdatedDate DATETIME2,
    CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryId) REFERENCES Categories(Id) ON DELETE RESTRICT
);
GO

-- Tao bang Banners
CREATE TABLE Banners (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200),
    Subtitle NVARCHAR(500),
    Background NVARCHAR(200),
    ImageUrl NVARCHAR(255),
    CtaText NVARCHAR(100),
    LinkUrl NVARCHAR(255),
    IsActive BIT DEFAULT 1,
    SortOrder INT DEFAULT 0,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    UpdatedDate DATETIME2
);
GO

-- Tao bang Orders
CREATE TABLE Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    OrderDate DATETIME2 DEFAULT GETDATE(),
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) DEFAULT 'pending',
    ReceiverName NVARCHAR(100),
    ReceiverPhone NVARCHAR(15),
    ReceiverAddress NVARCHAR(500),
    Note NVARCHAR(500),
    PaymentMethod NVARCHAR(50),
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    UpdatedDate DATETIME2,
    CONSTRAINT FK_Orders_Users FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE RESTRICT
);
GO

-- Tao bang OrderDetails
CREATE TABLE OrderDetails (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2) NOT NULL,
    Subtotal DECIMAL(18,2) NOT NULL,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    UpdatedDate DATETIME2,
    CONSTRAINT FK_OrderDetails_Orders FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
    CONSTRAINT FK_OrderDetails_Products FOREIGN KEY (ProductId) REFERENCES Products(Id) ON DELETE RESTRICT
);
GO

-- Tao bang Reviews
CREATE TABLE Reviews (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    UserId INT NOT NULL,
    Stars INT NOT NULL,
    Text NVARCHAR(1000),
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    UpdatedDate DATETIME2,
    CONSTRAINT FK_Reviews_Products FOREIGN KEY (ProductId) REFERENCES Products(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Reviews_Users FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE RESTRICT
);
GO

-- Tao bang Contacts
CREATE TABLE Contacts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100),
    Email NVARCHAR(100),
    Phone NVARCHAR(15),
    Subject NVARCHAR(200),
    Message NVARCHAR(MAX),
    IsRead BIT DEFAULT 0,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    UpdatedDate DATETIME2
);
GO

-- Seed data cho Categories
INSERT INTO Categories (CategoryName, Slug, Emoji, Color, SortOrder, IsActive) VALUES
(N'Hoa Sinh Nhật', 'birthday', N'🎂', '#f7d6df', 1, 1),
(N'Hoa Khai Trương', 'opening', N'🏮', '#fff0d6', 2, 1),
(N'Lan Hồ Điệp', 'orchid', N'🌸', '#ede6ff', 3, 1),
(N'Hoa Cưới', 'wedding', N'💍', '#d6f0f7', 4, 1),
(N'Hoa Tang Lễ', 'condolence', N'🕊️', '#e8e8e8', 5, 1),
(N'Hoa Tình Yêu', 'love', N'❤️', '#ffd6d6', 6, 1);
GO

-- Seed data cho Users
INSERT INTO Users (FullName, Email, Phone, PasswordHash, Role, IsActive) VALUES
(N'Quản Trị Viên', 'admin@monglan.vn', '0901234567', '9dlUIpr23JllA57gEZDzjA==.ZDSPh7tTKI3JWMPRxXklhXac8/oS+PPmYxvKlRDDxRY=', 'Admin', 1),
(N'Nguyễn Văn Kiểm Thử', 'test@monglan.vn', '0909876543', '62JkwKPjjiNSuEX+PK1pkw==.nk3d07hgqb4iwNsWNGwrKPqVtItNWzueXf0fNFp10HE=', 'Customer', 1);
GO

-- Seed data cho Products
INSERT INTO Products (ProductName, CategoryId, Price, SalePrice, Img, Rating, ReviewCount, SoldQuantity, Badge, IsNew, StockQuantity, Description) VALUES
(N'Bó Hoa Hồng Đỏ Tình Yêu', 6, 450000, 380000, N'🌹', 4.8, 124, 312, 'hot', 0, 50, N'Bó hoa hồng đỏ tươi cao cấp, 20 bông hoa hồng Đà Lạt kết hợp lá xanh sang trọng. Phù hợp làm quà tặng người yêu nhân ngày Valentine, kỷ niệm.'),
(N'Giỏ Hoa Sinh Nhật Pastel', 1, 650000, 550000, N'🌷', 4.9, 89, 201, 'sale', 0, 30, N'Giỏ hoa sinh nhật tone pastel nhẹ nhàng với hoa cúc, hoa hồng phấn, lisianthus. Màu sắc tươi vui, thích hợp cho mọi lứa tuổi.'),
(N'Lan Hồ Điệp Trắng Tinh Khôi', 3, 1200000, NULL, N'🌸', 5.0, 56, 98, NULL, 1, 20, N'Chậu lan hồ điệp trắng cao cấp, 2 cành 12-15 bông. Chăm sóc kỹ lưỡng, hoa tươi lâu 30-45 ngày. Sang trọng, thanh lịch.'),
(N'Hoa Khai Trương May Mắn', 2, 2500000, 2200000, N'🏵️', 4.7, 43, 87, 'sale', 0, 15, N'Kệ hoa khai trương 2 tầng rực rỡ, mang ý nghĩa may mắn, thịnh vượng. Kết hợp hoa cúc, hồng, cát tường màu đỏ-vàng.'),
(N'Bó Hoa Cưới Cô Dâu', 4, 800000, NULL, N'💐', 4.9, 112, 234, 'hot', 0, 25, N'Bó cầm tay cô dâu sang trọng với hoa hồng trắng, baby breath, phong lan trắng. Kết hợp ribbon lụa cao cấp.'),
(N'Hoa Hướng Dương Rực Rỡ', 1, 350000, 300000, N'🌻', 4.6, 78, 156, 'sale', 1, 40, N'Bó hoa hướng dương tươi sáng, mang năng lượng tích cực. Kết hợp lá xanh tươi, gói giấy kraft thân thiện.'),
(N'Giỏ Hoa Chia Buồn', 5, 500000, NULL, N'🕊️', 4.5, 34, 67, NULL, 0, 20, N'Giỏ hoa tang lễ trang nhã, màu trắng và tím nhạt. Thể hiện sự tôn trọng và chia sẻ nỗi đau với gia đình.'),
(N'Bó Hoa Tulip Hà Lan', 6, 520000, 460000, N'🌷', 4.8, 67, 143, 'new', 1, 35, N'Bó tulip nhập khẩu Hà Lan đủ màu sắc: đỏ, vàng, tím, hồng. Hoa tươi nhập về 3 lần/tuần.'),
(N'Lan Hồ Điệp Tím Hoàng Gia', 3, 1500000, NULL, N'🌺', 4.9, 29, 54, NULL, 1, 15, N'Chậu lan hồ điệp tím cao cấp, 2 cành 10-12 bông. Màu tím quý phái, phù hợp làm quà biếu.'),
(N'Kệ Hoa Khai Trương Vạn Phát', 2, 3500000, 3000000, N'🌼', 4.8, 21, 45, 'sale', 0, 10, N'Kệ hoa khai trương cao cấp 3 tầng, thiết kế hoành tráng. Toàn hoa tươi nhập khẩu, đảm bảo tươi 5-7 ngày.'),
(N'Hoa Hồng Vàng Sang Trọng', 6, 680000, NULL, N'🌼', 4.7, 45, 98, NULL, 0, 20, N'Bó hoa hồng vàng 15 bông, tượng trưng cho tình yêu vĩnh cửu và sự trân trọng. Kết hợp gypsophila trắng.'),
(N'Giỏ Hoa Sinh Nhật VIP', 1, 1200000, 980000, N'🎁', 5.0, 38, 72, 'hot', 0, 15, N'Giỏ hoa sinh nhật cao cấp kết hợp hoa và chocolate Ferrero Rocher, gấu bông dễ thương. Món quà hoàn hảo.');
GO

-- Seed data cho Banners
INSERT INTO Banners (Title, Subtitle, Background, CtaText, IsActive, SortOrder) VALUES
(N'Valentine 2024', N'Ưu đãi đặc biệt - Giảm 20% tất cả hoa hồng', 'linear-gradient(135deg,#c84b6b,#8b2d47)', N'Mua Ngay', 1, 1),
(N'Khai Xuân Giáp Thìn', N'Miễn phí giao hàng cho đơn từ 500k', 'linear-gradient(135deg,#c9973a,#8b6520)', N'Khám Phá', 1, 2),
(N'Lan Hồ Điệp Mới Về', N'Hàng nhập khẩu chính hãng, giá tốt nhất', 'linear-gradient(135deg,#4a7c59,#2d5a3a)', N'Xem Ngay', 1, 3);
GO

-- Seed data cho Reviews
INSERT INTO Reviews (ProductId, UserId, Stars, Text, CreatedDate) VALUES
(1, 2, 5, N'Hoa rất đẹp, tươi lâu, đóng gói cẩn thận. Giao nhanh trong 2h. Sẽ ủng hộ dài dài!', '2024-01-15'),
(1, 2, 4, N'Hoa đẹp, màu sắc chuẩn như ảnh. Hơi trễ so với giờ hẹn 30 phút nhưng thông cảm được.', '2024-01-10'),
(3, 2, 5, N'Lan đẹp tuyệt vời! Mua tặng sếp nhân ngày khai trương, được khen ngợi nhiều. Rất hài lòng!', '2024-01-20');
GO

-- Tao cac indexes
CREATE INDEX IX_Products_CategoryId ON Products(CategoryId);
CREATE INDEX IX_Orders_UserId ON Orders(UserId);
CREATE INDEX IX_OrderDetails_OrderId ON OrderDetails(OrderId);
CREATE INDEX IX_OrderDetails_ProductId ON OrderDetails(ProductId);
CREATE INDEX IX_Reviews_ProductId ON Reviews(ProductId);
CREATE INDEX IX_Reviews_UserId ON Reviews(UserId);
GO

PRINT 'Da tao database FlowerShop va seed data thanh cong!';
GO
