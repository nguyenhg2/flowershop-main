import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import API from '../../api/index';

export function LoginModal() {
  const { setShowLogin, setShowRegister, setUser, showToast, setIsAdminMode, navigate } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const login = async () => {
    try {
      const response = await API.post('/auth/login', { email, password: pass });
      const userData = response.data.user;
      setUser(userData);
      if (userData.role === 'Admin') {
        setIsAdminMode(true);
        navigate('admin-dashboard');
      }
      setShowLogin(false);
      showToast('Chao mung ban quay lai!');
    } catch (error) {
      setErr(error.response?.data?.message || 'Sai email hoac mat khau');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setShowLogin(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:24,marginBottom:4}}>Dang nhap</div>
          <div style={{color:'var(--muted)',fontSize:14}}>Chao mung tro lai Mong Lan Flower</div>
        </div>
        {err && <div className="alert alert-error" style={{marginBottom:16}}>{err}</div>}
        <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" /></div>
        <div className="form-group"><label>Mat khau</label><input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Mat khau" onKeyDown={e => e.key === 'Enter' && login()} /></div>
        <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px',fontSize:16,marginTop:8}} onClick={login}>Dang nhap</button>
        <div style={{textAlign:'center',marginTop:16,fontSize:14,color:'var(--muted)'}}>
          Chua co tai khoan? <span style={{color:'var(--rose)',cursor:'pointer',fontWeight:700}} onClick={() => {setShowLogin(false);setShowRegister(true)}}>Dang ky ngay</span>
        </div>
      </div>
    </div>
  );
}

export function RegisterModal() {
  const { setShowRegister, setShowLogin, setUser, showToast } = useContext(AppContext);
  const [form, setForm] = useState({name:'',email:'',phone:'',pass:'',confirm:''});
  const [err, setErr] = useState('');
  const set = (k, v) => setForm(f => ({...f,[k]:v}));

  const register = async () => {
    if (!form.name || !form.email || !form.phone || !form.pass) { setErr('Vui long dien day du thong tin'); return; }
    if (form.pass !== form.confirm) { setErr('Mat khau xac nhan khong khop'); return; }
    try {
      const response = await API.post('/auth/register', { name: form.name, email: form.email, phone: form.phone, password: form.pass });
      const userData = response.data.user;
      setUser(userData);
      setShowRegister(false);
      showToast('Dang ky thanh cong!');
    } catch (error) {
      setErr(error.response?.data?.message || 'Co loi xay ra');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setShowRegister(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:24,marginBottom:4}}>Tao tai khoan</div>
        </div>
        {err && <div className="alert alert-error" style={{marginBottom:16}}>{err}</div>}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div className="form-group"><label>Ho ten *</label><input value={form.name} onChange={e => set('name',e.target.value)} placeholder="Nguyen Van A" /></div>
          <div className="form-group"><label>So dien thoai *</label><input value={form.phone} onChange={e => set('phone',e.target.value)} placeholder="0901234567" /></div>
        </div>
        <div className="form-group"><label>Email *</label><input type="email" value={form.email} onChange={e => set('email',e.target.value)} placeholder="email@example.com" /></div>
        <div className="form-group"><label>Mat khau *</label><input type="password" value={form.pass} onChange={e => set('pass',e.target.value)} placeholder="Toi thieu 6 ky tu" /></div>
        <div className="form-group"><label>Xac nhan mat khau *</label><input type="password" value={form.confirm} onChange={e => set('confirm',e.target.value)} placeholder="Nhap lai mat khau" /></div>
        <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px',fontSize:16,marginTop:4}} onClick={register}>Dang ky</button>
        <div style={{textAlign:'center',marginTop:16,fontSize:14,color:'var(--muted)'}}>
          Da co tai khoan? <span style={{color:'var(--rose)',cursor:'pointer',fontWeight:700}} onClick={() => {setShowRegister(false);setShowLogin(true)}}>Dang nhap</span>
        </div>
      </div>
    </div>
  );
}
