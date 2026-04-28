import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { BANNERS } from '../../data/flowerData';

export function AdminBanners() {
  const { navigate, showToast } = useContext(AppContext);
  const [banners, setBanners] = useState([...BANNERS]);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({ title: '', sub: '', cta: '', bg: '' });

  const handleAdd = () => {
    setEditingBanner(null);
    setFormData({ title: '', sub: '', cta: '', bg: '#c84b6b' });
    setShowModal(true);
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({ title: banner.title, sub: banner.sub, cta: banner.cta, bg: banner.bg });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      showToast('Vui lòng nhập tiêu đề');
      return;
    }
    if (editingBanner) {
      setBanners(banners.map(b => 
        b.id === editingBanner.id ? {...editingBanner, ...formData} : b
      ));
      showToast('Đã cập nhật banner');
    } else {
      setBanners([...banners, { id: banners.length + 1, ...formData, active: true }]);
      showToast('Đã thêm banner mới');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa banner này?')) {
      setBanners(banners.filter(b => b.id !== id));
      showToast('Đã xóa banner');
    }
  };

  const toggleActive = (id) => {
    setBanners(banners.map(b => 
      b.id === id ? {...b, active: !b.active} : b
    ));
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
          <button onClick={() => navigate('admin-customers')}>👥 Khách hàng</button>
          <button onClick={() => navigate('admin-reviews')}>⭐ Đánh giá</button>
          <button className="active" onClick={() => navigate('admin-banners')}>🖼️ Banner</button>
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
          <h1>Quản lý banner</h1>
          <button className="btn-primary" onClick={handleAdd}>+ Thêm banner</button>
        </header>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Preview</th>
              <th>Tiêu đề</th>
              <th>Phụ đề</th>
              <th>Nút CTA</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {banners.map(banner => (
              <tr key={banner.id}>
                <td>{banner.id}</td>
                <td><div className="banner-preview" style={{background: banner.bg}}></div></td>
                <td>{banner.title}</td>
                <td>{banner.sub}</td>
                <td>{banner.cta}</td>
                <td>
                  <button 
                    className={`status-toggle ${banner.active !== false ? 'active' : 'inactive'}`}
                    onClick={() => toggleActive(banner.id)}
                  >
                    {banner.active !== false ? '✓ Bật' : '✗ Tắt'}
                  </button>
                </td>
                <td className="action-buttons">
                  <button className="btn-edit" onClick={() => handleEdit(banner)}>Sửa</button>
                  <button className="btn-delete" onClick={() => handleDelete(banner.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingBanner ? 'Sửa banner' : 'Thêm banner mới'}</h2>
            <div className="form-group">
              <label>Tiêu đề</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Nhập tiêu đề"
              />
            </div>
            <div className="form-group">
              <label>Phụ đề</label>
              <input 
                type="text" 
                value={formData.sub} 
                onChange={(e) => setFormData({...formData, sub: e.target.value})}
                placeholder="Nhập phụ đề"
              />
            </div>
            <div className="form-group">
              <label>Text nút</label>
              <input 
                type="text" 
                value={formData.cta} 
                onChange={(e) => setFormData({...formData, cta: e.target.value})}
                placeholder="VD: Mua Ngay"
              />
            </div>
            <div className="form-group">
              <label>Màu nền</label>
              <input 
                type="color" 
                value={formData.bg.startsWith('linear') ? '#c84b6b' : formData.bg} 
                onChange={(e) => setFormData({...formData, bg: e.target.value})}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSave}>Lưu</button>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
