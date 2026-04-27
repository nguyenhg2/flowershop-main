import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/flowerData';

export function AdminProducts() {
  const { navigate, showToast } = useContext(AppContext);
  const [products, setProducts] = useState([...PRODUCTS]);
  const [filterCat, setFilterCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter(p => {
    const matchCat = filterCat === 'all' || p.cat === filterCat;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
      showToast('Đã xóa sản phẩm');
    }
  };

  const handleToggleStatus = (id) => {
    setProducts(products.map(p => 
      p.id === id ? {...p, isActive: !p.isActive} : p
    ));
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
          <button className="active" onClick={() => navigate('admin-products')}>🌹 Sản phẩm</button>
          <button onClick={() => navigate('admin-categories')}>📁 Danh mục</button>
          <button onClick={() => navigate('admin-orders')}>📦 Đơn hàng</button>
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
          <h1>Quản lý sản phẩm</h1>
          <button className="btn-primary" onClick={() => { setEditingProduct(null); setShowModal(true); }}>
            + Thêm sản phẩm
          </button>
        </header>

        <div className="admin-filters">
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
            <option value="all">Tất cả danh mục</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Giảm giá</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td className="product-img">{product.img}</td>
                <td>{product.name}</td>
                <td>{CATEGORIES.find(c => c.id === product.cat)?.name || product.cat}</td>
                <td>{product.price.toLocaleString('vi-VN')}₫</td>
                <td>{product.sale ? `${product.sale.toLocaleString('vi-VN')}₫` : '-'}</td>
                <td>
                  <button 
                    className={`status-toggle ${product.isActive !== false ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleStatus(product.id)}
                  >
                    {product.isActive !== false ? '✓ Hoạt động' : '✗ Ẩn'}
                  </button>
                </td>
                <td className="action-buttons">
                  <button className="btn-edit" onClick={() => { setEditingProduct(product); setShowModal(true); }}>Sửa</button>
                  <button className="btn-delete" onClick={() => handleDelete(product.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
