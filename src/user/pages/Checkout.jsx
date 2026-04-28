import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { fmt } from '../components/fmt';
import axios from 'axios';

export function CheckoutPage() {
  const {cart, cartTotal, setOrders, navigate, showToast, user, setShowLogin} = useContext(AppContext);
  const [form, setForm] = useState({name:user?.name||'',phone:user?.phone||'',address:'',note:'',payment:'cod'});
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState(null);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const validate = () => {
    const e = {};
    if(!form.name.trim()) e.name='Vui long nhap ten nguoi nhan';
    if(!/^(0|\+84)\d{9}$/.test(form.phone)) e.phone='So dien thoai khong hop le';
    if(!form.address.trim()) e.address='Vui long nhap dia chi giao hang';
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const placeOrder = async () => {
    if(!validate()) return;
    
    try {
      const orderRequest = {
        items: cart.map(i => ({ productId: i.id, quantity: i.qty, price: i.sale || i.price })),
        customerName: form.name,
        customerPhone: form.phone,
        deliveryAddress: form.address,
        note: form.note,
        paymentMethod: form.payment,
        total: cartTotal + (cartTotal < 500000 ? 30000 : 0)
      };

      const response = await axios.post('https://localhost:7001/api/orders', orderRequest);
      const order = response.data.order;
      
      setOrderData(order);
      setOrders(o => [order, ...o]);
      setStep(3);
    } catch (error) {
      showToast('Co loi xay ra khi dat hang');
    }
  };

  const exportBill = () => {
    if (!orderData) return;
    
    const billContent = `
HOA DON BAN HANG - MONG LAN FLOWER
=====================================
Ma don hang: ${orderData.id}
Ngay dat: ${orderData.date || new Date().toLocaleDateString('vi-VN')}

THONG TIN KHACH HANG:
- Ten: ${orderData.customerName || form.name}
- So dien thoai: ${orderData.customerPhone || form.phone}
- Dia chi: ${orderData.deliveryAddress || form.address}

CHI TIET DON HANG:
${orderData.items.map((item, index) => `${index + 1}. ${item.productName || 'San pham'} - SL: ${item.quantity} - Don gia: ${fmt(item.price)} - Thanh tien: ${fmt(item.quantity * item.price)}`).join('\n')}

TAM TINH: ${fmt(cartTotal)}
PHI GIAO: ${cartTotal >= 500000 ? 'Mien phi' : fmt(30000)}
TONG CONG: ${fmt(orderData.total || cartTotal + (cartTotal < 500000 ? 30000 : 0))}

PHUONG THUC THANH TOAN: ${orderData.paymentMethod === 'cod' ? 'Tien mat khi nhan hang (COD)' : 'Chuyen khoan ngan hang'}
GHI CHU: ${orderData.note || form.note || 'Khong co'}

CAM ON QUY KHACH DA MUA HANG!
Mong Lan Flower - 123 Duong Hoa Mai, Q.1, TP.HCM
Hotline: 0901 234 567
    `.trim();

    const blob = new Blob([billContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HoaDon_${orderData.id || 'ML' + Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if(step===3) return (
    <div className="page" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh'}}>
      <div style={{textAlign:'center',maxWidth:400}}>
        <div style={{fontSize:80,marginBottom:16}}>Thanh cong</div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:28,marginBottom:8}}>Dat hang thanh cong!</div>
        <div style={{color:'var(--muted)',marginBottom:8}}>Cam on ban da tin tuong Mong Lan Flower</div>
        <div style={{color:'var(--muted)',marginBottom:24,fontSize:14}}>Chung toi se lien he xac nhan va giao hang trong 2-4 gio</div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button className="btn btn-primary" onClick={()=>navigate('home')}>Ve trang chu</button>
          <button className="btn btn-outline" onClick={()=>navigate('profile')}>Xem don hang</button>
          <button className="btn btn-ghost" onClick={exportBill}>Xuat hoa don</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div style={{background:'var(--warm)',padding:'28px 0',marginBottom:28}}>
        <div className="container"><div style={{fontFamily:'Playfair Display,serif',fontSize:28}}>Dat hang</div></div>
      </div>
      <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:28,alignItems:'start'}}>
        <div>
          <div style={{display:'flex',gap:0,marginBottom:32}}>
            {['Thong tin giao hang','Thanh toan'].map((s,i)=>(
              <div key={i} style={{flex:1,display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:step>i+1||step===i+1?'var(--rose)':'var(--border)',color:step>i+1||step===i+1?'#fff':'var(--muted)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:14,flexShrink:0}}>{i+1}</div>
                <span style={{fontSize:14,fontWeight:step===i+1?700:400,color:step===i+1?'var(--text)':'var(--muted)'}}>{s}</span>
                {i<1&&<div style={{flex:1,height:2,background:'var(--border)',marginLeft:8}}/>}
              </div>
            ))}
          </div>

          {step===1 && (
            <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:28}}>
              <div style={{fontWeight:800,fontSize:16,marginBottom:20}}>Thong tin nguoi nhan</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                <div className="form-group">
                  <label>Ten nguoi nhan *</label>
                  <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Nguyen Van A"/>
                  {errors.name&&<div style={{color:'var(--rose)',fontSize:12,marginTop:4}}>{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label>So dien thoai *</label>
                  <input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="0901 234 567"/>
                  {errors.phone&&<div style={{color:'var(--rose)',fontSize:12,marginTop:4}}>{errors.phone}</div>}
                </div>
              </div>
              <div className="form-group">
                <label>Dia chi giao hang *</label>
                <input value={form.address} onChange={e=>set('address',e.target.value)} placeholder="So nha, duong, phuong/xa, quan/huyen, tinh/thanh pho"/>
                {errors.address&&<div style={{color:'var(--rose)',fontSize:12,marginTop:4}}>{errors.address}</div>}
              </div>
              <div className="form-group">
                <label>Ghi chu don hang</label>
                <textarea value={form.note} onChange={e=>set('note',e.target.value)} rows={3} placeholder="Vi du: giao gio hanh chinh, de thiep 'Happy Birthday'..."/>
              </div>
              <button className="btn btn-primary" style={{padding:'12px 32px',fontSize:15}} onClick={()=>{if(validate())setStep(2)}}>
                Tiep tuc -> Thanh toan
              </button>
            </div>
          )}

          {step===2 && (
            <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:28}}>
              <div style={{fontWeight:800,fontSize:16,marginBottom:20}}>Phuong thuc thanh toan</div>
              {[['cod','Thanh toan khi nhan hang (COD)','Tra tien mat cho shipper khi nhan hang'],
                ['transfer','Chuyen khoan ngan hang','Chuyen khoan truoc, xac nhan qua SMS']].map(([v,l,sub])=>(
                <div key={v} onClick={()=>set('payment',v)} style={{border:`2px solid ${form.payment===v?'var(--rose)':'var(--border)'}`,borderRadius:12,padding:16,marginBottom:12,cursor:'pointer',background:form.payment===v?'var(--rose-light)':'#fff',transition:'all .2s'}}>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{l}</div>
                  <div style={{fontSize:13,color:'var(--muted)'}}>{sub}</div>
                  {v==='transfer'&&form.payment==='transfer'&&(
                    <div style={{marginTop:12,padding:12,background:'#fff',borderRadius:8,fontSize:13}}>
                      <div style={{fontWeight:700,marginBottom:4}}>Thong tin tai khoan:</div>
                      <div>Ngan hang: Vietcombank</div>
                      <div>So TK: 1234 5678 9012</div>
                      <div>Chu TK: CONG TY MONG LAN FLOWER</div>
                      <div>Noi dung: Ten + SDT + Dat hoa</div>
                    </div>
                  )}
                </div>
              ))}
              <div style={{display:'flex',gap:12,marginTop:20}}>
                <button className="btn btn-ghost" onClick={()=>setStep(1)}>Quay lai</button>
                <button className="btn btn-primary" style={{padding:'12px 32px',fontSize:15}} onClick={placeOrder}>Xac nhan dat hang</button>
              </div>
            </div>
          )}
        </div>

        <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:24,position:'sticky',top:80}}>
          <div style={{fontWeight:800,fontSize:16,marginBottom:16}}>Don hang cua ban</div>
          {cart.map(i=>(
            <div key={i.id} style={{display:'flex',gap:10,alignItems:'center',marginBottom:12}}>
              <span style={{fontSize:28}}>{i.img}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,lineHeight:1.3}}>{i.name}</div>
                <div style={{fontSize:12,color:'var(--muted)'}}>x{i.qty}</div>
              </div>
              <span style={{fontWeight:700,fontSize:14}}>{fmt((i.sale||i.price)*i.qty)}</span>
            </div>
          ))}
          <div className="divider"/>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:14,marginBottom:8,color:'var(--muted)'}}>
            <span>Tam tinh</span><span>{fmt(cartTotal)}</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:14,marginBottom:12,color:'var(--green)'}}>
            <span>Phi giao</span><span>{cartTotal>=500000?'Mien phi':fmt(30000)}</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:18,fontWeight:800,color:'var(--rose)'}}>
            <span>Tong</span><span>{fmt(cartTotal+(cartTotal<500000?30000:0))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}