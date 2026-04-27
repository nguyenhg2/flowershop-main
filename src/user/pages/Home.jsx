import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES, BANNERS } from '../../data/flowerData';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const {navigate, addToCart} = useContext(AppContext);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [bannerBg, setBannerBg] = useState(BANNERS[0].bg);

  useEffect(()=>{
    const t = setInterval(()=>{
      setBannerIdx(i=>{const n=(i+1)%BANNERS.length; setBannerBg(BANNERS[n].bg); return n;});
    },4000);
    return ()=>clearInterval(t);
  },[]);

  const sale = PRODUCTS.filter(p=>p.sale);
  const hot = PRODUCTS.filter(p=>p.badge==='hot'||p.sold>100).slice(0,4);
  const newArr = PRODUCTS.filter(p=>p.isNew);

  return (
    <div className="page">
      {/* Banner */}
      <div style={{background:bannerBg,transition:'background 1s',padding:'64px 0',textAlign:'center',color:'#fff',marginBottom:48}}>
        <div className="container">
          <div style={{fontFamily:'Playfair Display,serif',fontSize:42,fontWeight:600,marginBottom:12}}>{BANNERS[bannerIdx].title}</div>
          <div style={{fontSize:18,marginBottom:28,opacity:.9}}>{BANNERS[bannerIdx].sub}</div>
          <button className="btn" style={{background:'#fff',color:'var(--rose)',padding:'12px 32px',fontSize:16,borderRadius:40}}>{BANNERS[bannerIdx].cta}</button>
          <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:24}}>
            {BANNERS.map((_,i)=><div key={i} onClick={()=>{setBannerIdx(i);setBannerBg(BANNERS[i].bg)}} style={{width:i===bannerIdx?28:10,height:10,borderRadius:5,background:'rgba(255,255,255,'+(i===bannerIdx?1:.5)+')',cursor:'pointer',transition:'all .3s'}}/>)}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container" style={{marginBottom:48}}>
        <div className="section-title">Danh mục sản phẩm</div>
        <div className="section-sub">Tìm hoa phù hợp cho mọi dịp</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:16}}>
          {CATEGORIES.map(c=>(
            <div key={c.id} onClick={()=>navigate('category',{cat:c.id})} style={{background:c.color,borderRadius:16,padding:'20px 14px',textAlign:'center',cursor:'pointer',transition:'transform .2s'}}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e=>e.currentTarget.style.transform=''}>
              <div style={{fontSize:36,marginBottom:8}}>{c.emoji}</div>
              <div style={{fontWeight:700,fontSize:14,color:'var(--text)'}}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sale */}
      <div className="container" style={{marginBottom:48}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:4}}>
          <div className="section-title">🔥 Đang Giảm Giá</div>
          <button className="btn btn-ghost" onClick={()=>navigate('category',{filter:'sale'})}>Xem tất cả →</button>
        </div>
        <div className="section-sub">Ưu đãi có thời hạn, đặt ngay kẻo hết!</div>
        <div className="grid-4">{sale.map(p=><ProductCard key={p.id} p={p}/>)}</div>
      </div>

      {/* Hot */}
      <div style={{background:'var(--warm)',padding:'48px 0',marginBottom:0}}>
        <div className="container">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:4}}>
            <div className="section-title">⭐ Bán Chạy Nhất</div>
            <button className="btn btn-ghost" onClick={()=>navigate('category',{sort:'sold'})}>Xem tất cả →</button>
          </div>
          <div className="section-sub">Được khách hàng yêu thích nhất</div>
          <div className="grid-4">{hot.map(p=><ProductCard key={p.id} p={p}/>)}</div>
        </div>
      </div>

      {/* New */}
      <div className="container" style={{marginTop:48}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:4}}>
          <div className="section-title">✨ Hoa Mới Về</div>
          <button className="btn btn-ghost">Xem tất cả →</button>
        </div>
        <div className="section-sub">Những mẫu hoa mới nhất vừa cập bến</div>
        <div className="grid-4">{newArr.map(p=><ProductCard key={p.id} p={p}/>)}</div>
      </div>

      {/* Banner CTA */}
      <div className="container" style={{marginTop:48}}>
        <div style={{background:'linear-gradient(135deg,#c84b6b,#4a7c59)',borderRadius:24,padding:'40px 40px',color:'#fff',display:'grid',gridTemplateColumns:'1fr auto',gap:24,alignItems:'center'}}>
          <div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:28,marginBottom:8}}>🚚 Miễn phí giao hàng nội thành</div>
            <div style={{opacity:.9}}>Đơn từ 500.000đ · Giao trong 2-4 giờ · Hoa tươi đảm bảo</div>
          </div>
          <button className="btn" style={{background:'#fff',color:'var(--rose)',padding:'12px 28px',fontSize:15}} onClick={()=>navigate('category',{})}>Đặt hoa ngay</button>
        </div>
      </div>
    </div>
  );
}