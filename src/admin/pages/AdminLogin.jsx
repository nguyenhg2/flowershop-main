import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export function AdminLogin() {
  const { setIsAdminMode, navigate } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple admin check - in real app, this would be API call
    if (email === 'admin@flowershop.com' && password === 'admin123') {
      localStorage.setItem('flowershop_admin', 'true');
      setIsAdminMode(true);
      navigate('admin-dashboard');
    } else {
      setError('Email hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>🌸 Flower Shop Admin</h1>
          <p>Đăng nhập quản trị</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@flowershop.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="btn-primary">Đăng nhập</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('home')}>
            ← Quay lại trang chủ
          </button>
        </form>
        <div className="admin-login-hint">
          <p>Dùng: admin@flowershop.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
