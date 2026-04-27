import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/flowerData';

export function AdminReports() {
  const { navigate, orders } = useContext(AppContext);
  
  // Calculate monthly revenue (mock data)
  const monthlyData = [
    {month:'Tháng 1', revenue:15000000, orders:45},
    {month:'Tháng 2', revenue:22000000, orders:62},
    {month:'Tháng 3', revenue:18500000, orders:53},
    {month:'Tháng 4', revenue:25000000, orders:71},
    {month:'Tháng 5', revenue:20000000, orders:58},
    {month:'Tháng 6', revenue:orders.reduce((s,o)=>s+o.total,0) || 28000000, orders:orders.length || 80},
  ];

  // Top selling products
  const topProducts = [...PRODUCTS]
    .sort((a,b) => b.sold - a.sold)
    .slice(0, 5);

  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue));

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
          <button onClick={() => navigate('admin-contact')}>📧 Liên hệ</button>
          <button className="active" onClick={() => navigate('admin-reports')}>📈 Báo cáo</button>
        </nav>
        <div className="admin-user-info">
          <span>Admin</span>
          <button onClick={() => { localStorage.removeItem('flowershop_admin'); navigate('home'); }} className="btn-logout">Đăng xuất</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Báo cáo thống kê</h1>
        </header>

        <div className="admin-section">
          <h2>Doanh thu theo tháng</h2>
          <div className="chart-container">
            <div className="bar-chart">
              {monthlyData.map((data, idx) => (
                <div key={idx} className="bar-item">
                  <div 
                    className="bar" 
                    style={{height: `${(data.revenue / maxRevenue) * 200}px`}}
                  ></div>
                  <span className="bar-label">{data.month}</span>
                  <span className="bar-value">{(data.revenue/1000000).toFixed(1)}tr</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h2>Top sản phẩm bán chạy</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th>Đã bán</th>
                <th>Doanh thu ước tính</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, idx) => (
                <tr key={product.id}>
                  <td>{idx + 1}</td>
                  <td>{product.name}</td>
                  <td>{CATEGORIES.find(c => c.id === product.cat)?.name || product.cat}</td>
                  <td><strong>{product.sold}</strong></td>
                  <td>{(product.sale ? product.sale : product.price) * product.sold.toLocaleString('vi-VN')}₫</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-section">
          <h2>Tổng quan</h2>
          <div className="stats-summary">
            <div className="stat-box">
              <h3>Tổng doanh thu 6 tháng</h3>
              <p>{monthlyData.reduce((s,m)=>s+m.revenue,0).toLocaleString('vi-VN')}₫</p>
            </div>
            <div className="stat-box">
              <h3>Tổng đơn hàng</h3>
              <p>{monthlyData.reduce((s,m)=>s+m.orders,0)}</p>
            </div>
            <div className="stat-box">
              <h3>Trung bình/tháng</h3>
              <p>{(monthlyData.reduce((s,m)=>s+m.revenue,0)/6).toLocaleString('vi-VN')}₫</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
