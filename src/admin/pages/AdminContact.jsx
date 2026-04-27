import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export function AdminContact() {
  const { navigate, showToast } = useContext(AppContext);
  const [messages, setMessages] = useState([
    {id:1, name:'Nguyễn Văn A', email:'a@example.com', phone:'0901234567', subject:'Tư vấn hoa cưới', message:'Shop tư vấn giúp mình gói hoa cưới ngân sách 2 triệu.', date:'2024-01-20', read:false},
    {id:2, name:'Trần Thị B', email:'b@example.com', phone:'0912345678', subject:'Giao hàng khẩn', message:'Mình cần giao hoa gấp trong hôm nay được không?', date:'2024-01-19', read:true},
    {id:3, name:'Lê Văn C', email:'c@example.com', phone:'0923456789', subject:'Hợp tác kinh doanh', message:'Mình muốn hợp tác cung cấp hoa sỉ cho shop.', date:'2024-01-18', read:false},
  ]);

  const markAsRead = (id) => {
    setMessages(messages.map(m => 
      m.id === id ? {...m, read: true} : m
    ));
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa tin nhắn này?')) {
      setMessages(messages.filter(m => m.id !== id));
      showToast('Đã xóa tin nhắn');
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
          <button onClick={() => navigate('admin-reviews')}>⭐ Đánh giá</button>
          <button onClick={() => navigate('admin-banners')}>🖼️ Banner</button>
          <button className="active" onClick={() => navigate('admin-contact')}>📧 Liên hệ</button>
          <button onClick={() => navigate('admin-reports')}>📈 Báo cáo</button>
        </nav>
        <div className="admin-user-info">
          <span>Admin</span>
          <button onClick={() => { localStorage.removeItem('flowershop_admin'); navigate('home'); }} className="btn-logout">Đăng xuất</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Tin nhắn liên hệ</h1>
        </header>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Chủ đề</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id} className={!msg.read ? 'unread' : ''}>
                <td>{msg.id}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.phone}</td>
                <td>{msg.subject}</td>
                <td>{msg.date}</td>
                <td>
                  <span className={`status-badge ${msg.read ? 'status-completed' : 'status-pending'}`}>
                    {msg.read ? '✓ Đã đọc' : '● Chưa đọc'}
                  </span>
                </td>
                <td className="action-buttons">
                  <button className="btn-view" onClick={() => markAsRead(msg.id)}>Xem</button>
                  <button className="btn-delete" onClick={() => handleDelete(msg.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
