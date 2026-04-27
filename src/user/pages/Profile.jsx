import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { PRODUCTS } from '../../data/flowerData';
import { fmt } from '../components/fmt';

export function ProfilePage() {
  const {user, setUser, orders, navigate, showToast, setShowLogin} = useContext(AppContext);
  const [tab, setTab] = useState('info');
  const [form, setForm] = useState({name:user?.name||'',email:user?.email||'',phone:user?.phone||''});
  const [pwForm, setPwForm] = useState({old:'',new1:'',new2:''});
  const [viewOrder, setViewOrder] = useState(null);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  if(!user) return (
    <div className="page" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:60,marginBottom:16}}>👤</div>
        <div style={{fontSize:20,fontWeight:700,marginBottom:8}}>Bạn chưa đăng nhập</div>
        <button className="btn btn-primary" onClick={()=>setShowLogin(true)}>Đăng nhập ngay</button>
      </div>
    </div>
  );

  const statusLabel = {pending:'Chờ xác nhận',processing:'Đang giao',delivered:'Đã nhận',cancelled:'Đã hủy'};
  const statusClass = {pending:'status-pending',processing:'status-processing',delivered:'status-delivered',cancelled:'status-cancelled'};

  const sampleOrders = orders.length>0 ? orders : [
    {id:'ML001',date:'20/01/2024',items:[PRODUCTS[0]],total:380000,status:'delivered',address:'123 Nguyễn Du, Q.1, TP.HCM'},
    {id:'ML002',date:'15/01/2024',items:[PRODUCTS[2]],total:1200000,status:'processing',address:'456 Lê Lợi, Q.3, TP.HCM'},
  ];

  return (
    <div className="page">
      <div style={{background:'var(--warm)',padding:'28px 0',marginBottom:28}}>
        <div className="container">
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <div style={{width:60,height:60,borderRadius:'50%',background:'var(--rose-light)',color:'var(--rose)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:24}}>{user.name[0]}</div>
            <div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:24}}>{user.name}</div>
              <div style={{color:'var(--muted)',fontSize:14}}>{user.email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:28,alignItems:'start'}}>
        <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',overflow:'hidden'}}>
          {[['info','👤 Thông tin cá nhân'],['password','🔒 Đổi mật khẩu'],['orders','📦 Lịch sử đơn hàng']].map(([k,l])=>(
            <div key={k} onClick={()=>{setTab(k);setViewOrder(null)}} style={{padding:'14px 20px',cursor:'pointer',fontWeight:tab===k?700:400,color:tab===k?'var(--rose)':'var(--text)',background:tab===k?'var(--rose-light)':'',borderLeft:`3px solid ${tab===k?'var(--rose)':'transparent'}`,transition:'all .2s'}}>
              {l}
            </div>
          ))}
        </div>
        <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:28}}>
          {tab==='info'&&(
            <>
              <div style={{fontWeight:800,fontSize:17,marginBottom:24}}>Thông tin cá nhân</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                <div className="form-group"><label>Họ tên</label><input value={form.name} onChange={e=>set('name',e.target.value)}/></div>
                <div className="form-group"><label>Số điện thoại</label><input value={form.phone} onChange={e=>set('phone',e.target.value)}/></div>
              </div>
              <div className="form-group"><label>Email</label><input value={form.email} onChange={e=>set('email',e.target.value)}/></div>
              <button className="btn btn-primary" onClick={()=>{setUser(u=>({...u,...form}));showToast('Cập nhật thông tin thành công!')}}>💾 Lưu thay đổi</button>
            </>
          )}
          {tab==='password'&&(
            <>
              <div style={{fontWeight:800,fontSize:17,marginBottom:24}}>Đổi mật khẩu</div>
              <div style={{maxWidth:400}}>
                <div className="form-group"><label>Mật khẩu hiện tại</label><input type="password" value={pwForm.old} onChange={e=>setPwForm(f=>({...f,old:e.target.value}))}/></div>
                <div className="form-group"><label>Mật khẩu mới</label><input type="password" value={pwForm.new1} onChange={e=>setPwForm(f=>({...f,new1:e.target.value}))}/></div>
                <div className="form-group"><label>Xác nhận mật khẩu mới</label><input type="password" value={pwForm.new2} onChange={e=>setPwForm(f=>({...f,new2:e.target.value}))}/></div>
                <button className="btn btn-primary" onClick={()=>{if(pwForm.new1===pwForm.new2&&pwForm.new1){showToast('Đổi mật khẩu thành công!');setPwForm({old:'',new1:'',new2:''})}else showToast('Mật khẩu không khớp!')}}>
                  🔒 Đổi mật khẩu
                </button>
              </div>
            </>
          )}
          {tab==='orders'&&!viewOrder&&(
            <>
              <div style={{fontWeight:800,fontSize:17,marginBottom:24}}>Lịch sử đơn hàng</div>
              {sampleOrders.length===0 ? (
                <div style={{textAlign:'center',padding:60,color:'var(--muted)'}}>
                  <div style={{fontSize:50,marginBottom:12}}>📭</div>
                  <div>Bạn chưa có đơn hàng nào</div>
                  <button className="btn btn-primary" style={{marginTop:16}} onClick={()=>navigate('home')}>Mua sắm ngay</button>
                </div>
              ) : (
                <table>
                  <thead><tr><th>Mã ĐH</th><th>Ngày</th><th>Tổng tiền</th><th>Trạng thái</th><th></th></tr></thead>
                  <tbody>
                    {sampleOrders.map(o=>(
                      <tr key={o.id}>
                        <td style={{fontWeight:700,color:'var(--rose)'}}>{o.id}</td>
                        <td style={{color:'var(--muted)',fontSize:14}}>{o.date}</td>
                        <td style={{fontWeight:700}}>{fmt(o.total)}</td>
                        <td><span className={`status-badge ${statusClass[o.status]}`}>{statusLabel[o.status]}</span></td>
                        <td><button className="btn btn-ghost" style={{fontSize:13}} onClick={()=>setViewOrder(o)}>Xem chi tiết</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
          {tab==='orders'&&viewOrder&&(
            <>
              <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:24}}>
                <button className="btn btn-ghost" onClick={()=>setViewOrder(null)}>← Quay lại</button>
                <div style={{fontWeight:800,fontSize:17}}>Chi tiết đơn #{viewOrder.id}</div>
                <span className={`status-badge ${statusClass[viewOrder.status]}`}>{statusLabel[viewOrder.status]}</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:24}}>
                <div style={{padding:16,background:'var(--warm)',borderRadius:12}}>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:8,textTransform:'uppercase',letterSpacing:.4,color:'var(--muted)'}}>Thông tin giao hàng</div>
                  <div style={{fontSize:14,lineHeight:1.8}}><b>{viewOrder.name||user.name}</b><br/>{viewOrder.phone||user.phone}<br/>{viewOrder.address}</div>
                </div>
                <div style={{padding:16,background:'var(--warm)',borderRadius:12}}>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:8,textTransform:'uppercase',letterSpacing:.4,color:'var(--muted)'}}>Thanh toán</div>
                  <div style={{fontSize:14}}>{viewOrder.payment==='cod'?'💵 Tiền mặt (COD)':'🏦 Chuyển khoản'}</div>
                  <div style={{marginTop:8,fontSize:16,fontWeight:800,color:'var(--rose)'}}>{fmt(viewOrder.total)}</div>
                </div>
              </div>
              <table>
                <thead><tr><th>Sản phẩm</th><th>Số lượng</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead>
                <tbody>
                  {viewOrder.items.map(i=>(
                    <tr key={i.id}>
                      <td><div style={{display:'flex',gap:10,alignItems:'center'}}><span style={{fontSize:28}}>{i.img}</span><span style={{fontWeight:600,fontSize:14}}>{i.name}</span></div></td>
                      <td>{i.qty||1}</td>
                      <td>{fmt(i.sale||i.price)}</td>
                      <td style={{fontWeight:700}}>{fmt((i.sale||i.price)*(i.qty||1))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}