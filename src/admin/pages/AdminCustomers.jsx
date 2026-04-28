import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export function AdminCustomers() {
  const { navigate, showToast } = useContext(AppContext);
  const [customers, setCustomers] = useState([
    {id:1, name:'Nguyễn Lan Anh', email:'lananh@example.com', phone:'0901234567', orders:5, total:2500000, status:'active'},
    {id:2, name:'Trần Minh Khoa', email:'khoatm@example.com', phone:'0912345678', orders:3, total:1800000, status:'active'},
    {id:3, name:'Phạm Thu Hương', email:'huongpt@example.com', phone:'0923456789', orders:8, total:4200000, status:'active'},
  ]);

  const toggleStatus = (id) => {
    setCustomers(customers.map(c => 
      c.id === id ? {...c, status: c.status === 'active' ? 'locked' : 'active'} : c
    ));
    showToast('Đã cập nhật trạng thái khách hàng');
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2> Flower Shop</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button onClick={() => navigate('admin-dashboard')}>📊 Dashboard</button>
          <button onClick={() => navigate('admin-products')}> Sản phẩm</button>
          <button onClick={() => navigate('admin-categories')}>📁 Danh mục</button>
          <button onClick={() => navigate('admin-orders')}> Đơn hàng</button>
          <button className="active" onClick={() => navigate('admin-customers')}>👥 Khách hàng</button>
          <button onClick={() => navigate('admin-reviews')}>⭐ Đánh giá</button>
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
          <h1>Quản lý khách hàng</h1>
        </header>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Đơn hàng</th>
              <th>Tổng chi tiêu</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.orders}</td>
                <td>{customer.total.toLocaleString('vi-VN')}₫</td>
                <td>
                  <span className={`status-badge status-${customer.status}`}>
                    {customer.status === 'active' ? '✓ Hoạt động' : '✗ Bị khóa'}
                  </span>
                </td>
                <td className="action-buttons">
                  <button className="btn-view">Xem</button>
                  <button 
                    className={customer.status === 'active' ? 'btn-cancel' : 'btn-primary'}
                    onClick={() => toggleStatus(customer.id)}
                  >
                    {customer.status === 'active' ? 'Khóa' : 'Mở khóa'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
