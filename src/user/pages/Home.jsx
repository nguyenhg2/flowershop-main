import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import API from '../../api/index';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { navigate, addToCart } = useContext(AppContext);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes, bannerRes] = await Promise.all([
          API.get('/categories'),
          API.get('/products'),
          API.get('/banners')
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
        setBanners(bannerRes.data);
      } catch (err) {
        console.error('Loi tai du lieu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const t = setInterval(() => {
      setBannerIdx(i => (i + 1) % banners.length);
    }, 4000);
    return () => clearInterval(t);
  }, [banners]);

  if (loading) return <div style={{textAlign:'center',padding:60}}>Dang tai...</div>;

  const sale = products.filter(p => p.salePrice);
  const hot = products.filter(p => p.badge === 'hot' || p.soldQuantity > 100).slice(0, 4);
  const newArr = products.filter(p => p.isNew);
  const currentBanner = banners[bannerIdx] || {};

  return (
    <div className="page">
      {banners.length > 0 && (
        <div style={{background:currentBanner.background || 'var(--rose)',transition:'background 1s',padding:'64px 0',textAlign:'center',color:'#fff',marginBottom:48}}>
          <div className="container">
            <div style={{fontFamily:'Playfair Display,serif',fontSize:42,fontWeight:600,marginBottom:12}}>{currentBanner.title}</div>
            <div style={{fontSize:18,marginBottom:28,opacity:.9}}>{currentBanner.subtitle}</div>
            <button className="btn" style={{background:'#fff',color:'var(--rose)',padding:'12px 32px',fontSize:16,borderRadius:40}}>{currentBanner.ctaText}</button>
            <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:24}}>
              {banners.map((_, i) => <div key={i} onClick={() => setBannerIdx(i)} style={{width:i===bannerIdx?28:10,height:10,borderRadius:5,background:'rgba(255,255,255,'+(i===bannerIdx?1:.5)+')',cursor:'pointer',transition:'all .3s'}} />)}
            </div>
          </div>
        </div>
      )}

      <div className="container" style={{marginBottom:48}}>
        <div className="section-title">Danh muc san pham</div>
        <div className="section-sub">Tim hoa phu hop cho moi dip</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:16}}>
          {categories.map(c => (
            <div key={c.id} onClick={() => navigate('category', {cat:c.slug, catId:c.dbId})} style={{background:c.color || '#f0f0f0',borderRadius:16,padding:'20px 14px',textAlign:'center',cursor:'pointer',transition:'transform .2s'}}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform=''}>
              <div style={{fontWeight:700,fontSize:14,color:'var(--text)'}}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      {sale.length > 0 && (
        <div className="container" style={{marginBottom:48}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:4}}>
            <div className="section-title">Dang Giam Gia</div>
            <button className="btn btn-ghost" onClick={() => navigate('category', {filter:'sale'})}>Xem tat ca</button>
          </div>
          <div className="section-sub">Uu dai co thoi han, dat ngay!</div>
          <div className="grid-4">{sale.map(p => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      )}

      {hot.length > 0 && (
        <div style={{background:'var(--warm)',padding:'48px 0',marginBottom:0}}>
          <div className="container">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:4}}>
              <div className="section-title">Ban Chay Nhat</div>
              <button className="btn btn-ghost" onClick={() => navigate('category', {sort:'sold'})}>Xem tat ca</button>
            </div>
            <div className="section-sub">Duoc khach hang yeu thich nhat</div>
            <div className="grid-4">{hot.map(p => <ProductCard key={p.id} p={p} />)}</div>
          </div>
        </div>
      )}

      {newArr.length > 0 && (
        <div className="container" style={{marginTop:48}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:4}}>
            <div className="section-title">Hoa Moi Ve</div>
            <button className="btn btn-ghost">Xem tat ca</button>
          </div>
          <div className="section-sub">Nhung mau hoa moi nhat</div>
          <div className="grid-4">{newArr.map(p => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      )}

      <div className="container" style={{marginTop:48}}>
        <div style={{background:'linear-gradient(135deg,#c84b6b,#4a7c59)',borderRadius:24,padding:'40px 40px',color:'#fff',display:'grid',gridTemplateColumns:'1fr auto',gap:24,alignItems:'center'}}>
          <div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:28,marginBottom:8}}>Mien phi giao hang noi thanh</div>
            <div style={{opacity:.9}}>Don tu 500.000d - Giao trong 2-4 gio - Hoa tuoi dam bao</div>
          </div>
          <button className="btn" style={{background:'#fff',color:'var(--rose)',padding:'12px 28px',fontSize:15}} onClick={() => navigate('category', {})}>Dat hoa ngay</button>
        </div>
      </div>
    </div>
  );
}
