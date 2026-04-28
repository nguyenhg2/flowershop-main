import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export function AdminCategories() {
  const { navigate, showToast } = useContext(AppContext);
  const [categories, setCategories] = useState([
    {id:'birthday', name:'Hoa Sinh Nhật', color:'#f7d6df'},
    {id:'opening', name:'Hoa Khai Trương', color:'#fff0d6'},
    {id:'orchid', name:'Lan Hồ Điệp', color:'#ede6ff'},
    {id:'wedding', name:'Hoa Cưới', color:'#d6f0f7'},
    {id:'condolence', name:'Hoa Tang Lễ', color:'#e8e8e8'},
    {id:'love', name:'Hoa Tình Yêu', color:'#ffd6d6'},
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [formData, setFormData] = useState({ name: '', color: '#ffffff' });

  const handleAdd = () => {
    setEditingCat(null);
    setFormData({ name: '', color: '#ffffff' });
    setShowModal(true);
  };

  const handleEdit = (cat) => {
    setEditingCat(cat);
    setFormData({ name: cat.name, color: cat.color });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      showToast('Vui lòng nhập tên danh mục');
      return;
    }
    if (editingCat) {
      setCategories(categories.map(c => 
        c.id === editingCat.id ? {...c, name: formData.name, color: formData.color} : c
      ));
      showToast('Đã cập nhật danh mục');
    } else {
      const newId = formData.name.toLowerCase().replace(/\s+/g, '-');
      setCategories([...categories, { id: newId, name: formData.name, color: formData.color }]);
      showToast('Đã thêm danh mục mới');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa danh mục này?')) {
      setCategories(categories.filter(c => c.id !== id));
      showToast('Đã xóa danh mục');
    }
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
          <button className="active" onClick={() => navigate('admin-categories')}>📁 Danh mục</button>
          <button onClick={() => navigate('admin-orders')}> Đơn hàng</button>
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
          <h1>Quản lý danh mục</h1>
          <button className="btn-primary" onClick={handleAdd}>+ Thêm danh mục</button>
        </header>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Màu</th>
              <th>Tên danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td><div className="color-preview" style={{background: cat.color}}></div></td>
                <td>{cat.name}</td>
                <td className="action-buttons">
                  <button className="btn-edit" onClick={() => handleEdit(cat)}>Sửa</button>
                  <button className="btn-delete" onClick={() => handleDelete(cat.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingCat ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h2>
            <div className="form-group">
              <label>Tên danh mục</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nhập tên danh mục"
              />
            </div>
            <div className="form-group">
              <label>Màu sắc</label>
              <input 
                type="color" 
                value={formData.color} 
                onChange={(e) => setFormData({...formData, color: e.target.value})}
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
