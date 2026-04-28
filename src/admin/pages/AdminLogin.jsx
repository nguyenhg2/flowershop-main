import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export function AdminLogin() {
  const { setIsAdminMode, navigate, setUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@flowershop.com' && password === 'admin123') {
      localStorage.setItem('flowershop_admin', 'true');
      setUser({ name: 'Admin', email: email, role: 'admin' });
      setIsAdminMode(true);
      navigate('admin-dashboard');
    } else {
      setError('Email hoac mat khau khong dung!');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>Mong Lan Flower Admin</h1>
          <p>Dang nhap quan tri</p>
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
            <label>Mat khau</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="btn-primary">Dang nhap</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('home')}>
            Quay lai trang chu
          </button>
        </form>
        <div className="admin-login-hint">
          <p>Dung: admin@flowershop.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
