import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/flowerData';

export function AdminDashboard() {
  const { navigate, setIsAdminMode, user, orders, setOrders } = useContext(AppContext);
  
  // Calculate stats
  const totalProducts = PRODUCTS.length;
  const todayOrders = orders.filter(o => new Date(o.date).toDateString() === new Date().toDateString());
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
  const monthRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  
  const recentOrders = [...orders].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  const handleLogout = () => {
    localStorage.removeItem('flowershop_admin');
    setIsAdminMode(false);
    navigate('home');
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>🌸 Flower Shop</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button className="active" onClick={() => navigate('admin-dashboard')}>📊 Dashboard</button>
          <button onClick={() => navigate('admin-products')}>🌹 Sản phẩm</button>
          <button onClick={() => navigate('admin-categories')}>📁 Danh mục</button>
          <button onClick={() => navigate('admin-orders')}>📦 Đơn hàng</button>
          <button onClick={() => navigate('admin-customers')}>👥 Khách hàng</button>
          <button onClick={() => navigate('admin-reviews')}>⭐ Đánh giá</button>
          <button onClick={() => navigate('admin-banners')}>🖼️ Banner</button>
          <button onClick={() => navigate('admin-contact')}>📧 Liên hệ</button>
          <button onClick={() => navigate('admin-reports')}>📈 Báo cáo</button>
        </nav>
        <div className="admin-user-info">
          <span>{user?.name || 'Admin'}</span>
          <button onClick={handleLogout} className="btn-logout">Đăng xuất</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Dashboard</h1>
          <button onClick={() => navigate('home')} className="btn-view-shop">Xem trang web →</button>
        </header>

        <div className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>{orders.length}</h3>
              <p>Tổng đơn hàng</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>{todayRevenue.toLocaleString('vi-VN')}₫</h3>
              <p>Doanh thu hôm nay</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{monthRevenue.toLocaleString('vi-VN')}₫</h3>
              <p>Doanh thu tháng này</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌹</div>
            <div className="stat-info">
              <h3>{totalProducts}</h3>
              <p>Sản phẩm</p>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h2>Đơn hàng gần đây</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr><td colSpan="5">Chưa có đơn hàng nào</td></tr>
              ) : (
                recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.total.toLocaleString('vi-VN')}₫</td>
                    <td><span className={`status-badge status-${order.status}`}>{order.status}</span></td>
                    <td>{new Date(order.date).toLocaleDateString('vi-VN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
