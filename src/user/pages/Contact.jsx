import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export function ContactPage() {
  const [form, setForm] = useState({name:'',email:'',phone:'',subject:'',message:''});
  const [sent, setSent] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  return (
    <div className="page">
      <div style={{background:'var(--warm)',padding:'28px 0',marginBottom:40}}>
        <div className="container"><div style={{fontFamily:'Playfair Display,serif',fontSize:28}}>Lien he voi chung toi</div></div>
      </div>
      <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40}}>
        <div>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:22,marginBottom:20}}>Thong tin shop</div>
          {[['Dia chi','123 Duong Hoa Mai, Phuong Ben Nghe, Quan 1, TP.HCM'],
            ['Dien thoai','0901 234 567 (Ho tro 7:00 - 21:00)'],
            ['Email','hello@monglan.vn'],
            ['Gio lam viec','Thu 2 - Chu nhat: 7:00 - 21:00'],
            ['Giao hang','Noi thanh TP.HCM, giao trong 2-4 gio']].map(([l,v])=>(
            <div key={l} style={{display:'flex',gap:16,marginBottom:20,alignItems:'flex-start'}}>
              <div style={{width:44,height:44,borderRadius:12,background:'var(--rose-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{l[0]}</div>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:'var(--muted)',textTransform:'uppercase',letterSpacing:.4,marginBottom:2}}>{l}</div>
                <div style={{fontSize:15}}>{v}</div>
              </div>
            </div>
          ))}
          <div style={{background:'var(--warm)',borderRadius:16,padding:20,marginTop:8}}>
            <div style={{fontWeight:700,marginBottom:8}}>Ban do</div>
            <div style={{background:'#d4e8da',borderRadius:12,height:180,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--green)',fontWeight:700,fontSize:14}}>
              Hoa Mong Lan - Q.1, TP.HCM
            </div>
          </div>
        </div>
        <div style={{background:'#fff',borderRadius:20,border:'1px solid var(--border)',padding:32}}>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:22,marginBottom:6}}>Gui tin nhan</div>
          <div style={{color:'var(--muted)',fontSize:14,marginBottom:24}}>Chung toi se phan hoi trong vong 2 gio</div>
          {sent ? (
            <div className="alert alert-success" style={{textAlign:'center',padding:30}}>
              <div style={{fontSize:48,marginBottom:12}}>Gui thanh cong</div>
              <div style={{fontWeight:700,fontSize:16}}>Da gui thanh cong!</div>
              <div style={{marginTop:8,fontSize:14}}>Chung toi se lien he voi ban som nhat co the.</div>
            </div>
          ) : (
            <>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                <div className="form-group"><label>Ho ten *</label><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Nguyen Van A"/></div>
                <div className="form-group"><label>So dien thoai</label><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="0901 234 567"/></div>
              </div>
              <div className="form-group"><label>Email *</label><input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="email@example.com"/></div>
              <div className="form-group"><label>Chu de</label>
                <select value={form.subject} onChange={e=>set('subject',e.target.value)}>
                  <option value="">Chon chu de...</option>
                  <option>Tu van san pham</option>
                  <option>Dat hang so luong lon</option>
                  <option>Khieu nai / Phan hoi</option>
                  <option>Hop tac kinh doanh</option>
                  <option>Khac</option>
                </select>
              </div>
              <div className="form-group"><label>Noi dung *</label><textarea value={form.message} onChange={e=>set('message',e.target.value)} rows={4} placeholder="Nhap noi dung tin nhan..."/></div>
              <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px',fontSize:16}} onClick={()=>{if(form.name&&form.email&&form.message)setSent(true)}}>
                Gui tin nhan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}