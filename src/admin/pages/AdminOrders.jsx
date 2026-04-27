import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export function AdminOrders() {
  const { navigate, orders, setOrders, showToast } = useContext(AppContext);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => 
      o.id === orderId ? {...o, status: newStatus} : o
    ));
    showToast(`Đã cập nhật trạng thái đơn #${orderId}`);
    setSelectedOrder(null);
  };

  const cancelOrder = (orderId) => {
    if (confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
      updateOrderStatus(orderId, 'cancelled');
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
          <button className="active" onClick={() => navigate('admin-orders')}>📦 Đơn hàng</button>
          <button onClick={() => navigate('admin-customers')}>👥 Khách hàng</button>
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
          <h1>Quản lý đơn hàng</h1>
        </header>

        <div className="admin-filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="shipping">Đang giao</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>SĐT</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr><td colSpan="7">Chưa có đơn hàng nào</td></tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.phone}</td>
                  <td>{order.total.toLocaleString('vi-VN')}₫</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>{order.status}</span>
                  </td>
                  <td>{new Date(order.date).toLocaleDateString('vi-VN')}</td>
                  <td className="action-buttons">
                    <button className="btn-view" onClick={() => setSelectedOrder(order)}>Xem</button>
                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                      <button className="btn-cancel" onClick={() => cancelOrder(order.id)}>Hủy</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Chi tiết đơn #{selectedOrder.id}</h2>
            <div className="order-detail">
              <p><strong>Khách hàng:</strong> {selectedOrder.customerName}</p>
              <p><strong>SĐT:</strong> {selectedOrder.phone}</p>
              <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
              {selectedOrder.note && <p><strong>Ghi chú:</strong> {selectedOrder.note}</p>}
              <p><strong>Thanh toán:</strong> {selectedOrder.paymentMethod}</p>
              <p><strong>Trạng thái:</strong> <span className={`status-badge status-${selectedOrder.status}`}>{selectedOrder.status}</span></p>
              
              <h3>Sản phẩm</h3>
              <ul className="order-items">
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.qty} - {(item.sale || item.price) * item.qty.toLocaleString('vi-VN')}₫
                  </li>
                ))}
              </ul>
              <p className="order-total"><strong>Tổng cộng:</strong> {selectedOrder.total.toLocaleString('vi-VN')}₫</p>

              <div className="order-actions">
                {selectedOrder.status === 'pending' && (
                  <>
                    <button className="btn-primary" onClick={() => updateOrderStatus(selectedOrder.id, 'confirmed')}>Xác nhận</button>
                    <button className="btn-cancel" onClick={() => cancelOrder(selectedOrder.id)}>Hủy</button>
                  </>
                )}
                {selectedOrder.status === 'confirmed' && (
                  <button className="btn-primary" onClick={() => updateOrderStatus(selectedOrder.id, 'shipping')}>Đang giao</button>
                )}
                {selectedOrder.status === 'shipping' && (
                  <button className="btn-primary" onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}>Hoàn thành</button>
                )}
                <button className="btn-secondary" onClick={() => setSelectedOrder(null)}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
