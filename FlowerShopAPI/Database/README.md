# Hướng dẫn cấu hình SQL Server cho FlowerShop

## Connection String
```
Data Source=localhost\SQLEXPRESS;Initial Catalog=FlowerShop;Integrated Security=True;Encrypt=True;Trust Server Certificate=True
```

## Các bước thực hiện

### 1. Chạy script SQL để tạo database và seed data

Mở SQL Server Management Studio (SSMS) hoặc Azure Data Studio và chạy file `SeedData.sql`:

Hoặc sử dụng command line:

```bash
sqlcmd -S localhost\SQLEXPRESS -i /workspace/FlowerShopAPI/Database/SeedData.sql
```

### 2. Kiểm tra kết nối

Sau khi chạy script, kiểm tra các bảng đã được tạo:

```sql
USE FlowerShop;
SELECT * FROM Categories;
SELECT * FROM Products;
SELECT * FROM Users;
SELECT * FROM Banners;
```

### 3. Tài khoản mặc định

- **Admin**: 
  - Email: admin@monglan.vn
  - Password: Admin123!

- **User**: 
  - Email: test@monglan.vn
  - Password: Test123!

### 4. Chạy API

Sau khi database đã sẵn sàng, chạy project API:

```bash
cd /workspace/FlowerShopAPI/FlowerShop.API
dotnet run
```

API sẽ chạy tại: https://localhost:7001

### 5. Kiểm tra API endpoints

- GET https://localhost:7001/api/categories
- GET https://localhost:7001/api/products
- GET https://localhost:7001/api/banners

## Lưu ý

- Đảm bảo SQL Server Express đang chạy
- Nếu gặp lỗi kết nối, kiểm tra lại connection string trong appsettings.json
- File SeedData.sql đã loại bỏ toàn bộ emoji và comment không cần thiết
- Migration files đã được cập nhật để phù hợp với schema mới
