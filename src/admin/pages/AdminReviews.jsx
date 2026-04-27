import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { REVIEWS } from '../../data/flowerData';

export function AdminReviews() {
  const { navigate, showToast } = useContext(AppContext);
  const [reviews, setReviews] = useState([
    {id:1, productId:1, productName:'Bó Hoa Hồng Đỏ Tình Yêu', user:'Nguyễn Lan Anh', stars:5, date:'2024-01-15', text:'Hoa rất đẹp, tươi lâu, đóng gói cẩn thận. Giao nhanh trong 2h. Sẽ ủng hộ dài dài!'},
    {id:2, productId:1, productName:'Bó Hoa Hồng Đỏ Tình Yêu', user:'Trần Minh Khoa', stars:4, date:'2024-01-10', text:'Hoa đẹp, màu sắc chuẩn như ảnh. Hơi trễ so với giờ hẹn 30p nhưng thông cảm được.'},
    {id:3, productId:3, productName:'Lan Hồ Điệp Trắng Tinh Khôi', user:'Phạm Thu Hương', stars:5, date:'2024-01-20', text:'Lan đẹp tuyệt vời! Mua tặng sếp nhân ngày khai trương, được khen ngợi nhiều. Rất hài lòng!'},
  ]);

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa đánh giá này?')) {
      setReviews(reviews.filter(r => r.id !== id));
      showToast('Đã xóa đánh giá');
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>🌸 Flower Shop</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button onClick={() => navigate('admin-dashboard')}>📊 Dashboard</button>
          <button onClick={() => navigate('admin-products')}>🌹 Sản phẩm</button>
          <button onClick={() => navigate('admin-categories')}>📁 Danh mục</button>
          <button onClick={() => navigate('admin-orders')}>📦 Đơn hàng</button>
          <button onClick={() => navigate('admin-customers')}>👥 Khách hàng</button>
          <button className="active" onClick={() => navigate('admin-reviews')}>⭐ Đánh giá</button>
          <button onClick={() => navigate('admin-banners')}>🖼️ Banner</button>
          <button onClick={() => navigate('admin-contact')}>📧 Liên hệ</button>
          <button onClick={() => navigate('admin-reports')}>📈 Báo cáo</button>
        </nav>
        <div className="admin-user-info">
          <span>Admin</span>
          <button onClick={() => { localStorage.removeItem('flowershop_admin'); navigate('home'); }} className="btn-logout">Đăng xuất</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Quản lý đánh giá</h1>
        </header>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sản phẩm</th>
              <th>Khách hàng</th>
              <th>Sao</th>
              <th>Nội dung</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.productName}</td>
                <td>{review.user}</td>
                <td>{'⭐'.repeat(review.stars)}</td>
                <td className="review-text">{review.text}</td>
                <td>{review.date}</td>
                <td className="action-buttons">
                  <button className="btn-delete" onClick={() => handleDelete(review.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
