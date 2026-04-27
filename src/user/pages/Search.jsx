import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/flowerData';
import ProductCard from '../components/ProductCard';

export function SearchPage() {
  const {pageParams, navigate} = useContext(AppContext);
  const q = pageParams.q||'';
  const [sort, setSort] = useState('newest');
  const results = PRODUCTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||CATEGORIES.find(c=>c.id===p.cat)?.name.toLowerCase().includes(q.toLowerCase()));
  let sorted = [...results];
  if(sort==='price_asc') sorted.sort((a,b)=>(a.sale||a.price)-(b.sale||b.price));
  else if(sort==='price_desc') sorted.sort((a,b)=>(b.sale||b.price)-(a.sale||a.price));
  return (
    <div className="page">
      <div style={{background:'var(--warm)',padding:'28px 0',marginBottom:28}}>
        <div className="container">
          <div style={{fontFamily:'Playfair Display,serif',fontSize:24,marginBottom:4}}>🔍 Kết quả tìm kiếm: "{q}"</div>
          <div style={{color:'var(--muted)',fontSize:14}}>Tìm thấy {results.length} sản phẩm</div>
        </div>
      </div>
      <div className="container">
        <div style={{display:'flex',gap:8,marginBottom:20}}>
          {[['newest','Mới nhất'],['price_asc','Giá ↑'],['price_desc','Giá ↓']].map(([v,l])=>(
            <button key={v} onClick={()=>setSort(v)} style={{background:sort===v?'var(--rose)':'var(--warm)',color:sort===v?'#fff':'var(--muted)',padding:'6px 14px',border:'none',borderRadius:20,cursor:'pointer',fontSize:13,fontWeight:600}}>{l}</button>
          ))}
        </div>
        {sorted.length===0 ? (
          <div style={{textAlign:'center',padding:80}}>
            <div style={{fontSize:60,marginBottom:16}}>🔍</div>
            <div style={{fontSize:20,fontWeight:700,marginBottom:8}}>Không tìm thấy kết quả</div>
            <div style={{color:'var(--muted)',marginBottom:20}}>Thử tìm kiếm với từ khóa khác</div>
            <button className="btn btn-primary" onClick={()=>navigate('home')}>Về trang chủ</button>
          </div>
        ) : <div className="grid-4">{sorted.map(p=><ProductCard key={p.id} p={p}/>)}</div>}
      </div>
    </div>
  );
}