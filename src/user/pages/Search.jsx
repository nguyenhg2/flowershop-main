import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/flowerData';
import ProductCard from '../components/ProductCard';

export function SearchPage() {
  const {pageParams, navigate} = useContext(AppContext);
  const q = pageParams.q||'';
  const [sort, setSort] = useState('newest');
  const [filterCat, setFilterCat] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  
  let results = PRODUCTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||CATEGORIES.find(c=>c.id===p.cat)?.name.toLowerCase().includes(q.toLowerCase()));
  
  if(filterCat) results = results.filter(p=>p.cat===filterCat);
  if(filterPrice==='sale') results = results.filter(p=>p.sale);
  if(filterPrice==='new') results = results.filter(p=>p.isNew);
  
  let sorted = [...results];
  if(sort==='price_asc') sorted.sort((a,b)=>(a.sale||a.price)-(b.sale||b.price));
  else if(sort==='price_desc') sorted.sort((a,b)=>(b.sale||b.price)-(a.sale||a.price));
  
  return (
    <div className="page">
      <div style={{background:'var(--warm)',padding:'28px 0',marginBottom:28}}>
        <div className="container">
          <div style={{fontFamily:'Playfair Display,serif',fontSize:24,marginBottom:4}}>Ket qua tim kiem: "{q}"</div>
          <div style={{color:'var(--muted)',fontSize:14}}>Tim thay {results.length} san pham</div>
        </div>
      </div>
      <div className="container">
        <div style={{display:'flex',gap:16,marginBottom:20,flexWrap:'wrap',alignItems:'center'}}>
          <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} style={{padding:'8px 14px',borderRadius:8,border:'1px solid var(--border)',fontSize:13,minWidth:150}}>
            <option value="">Tat ca danh muc</option>
            {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={filterPrice} onChange={e=>setFilterPrice(e.target.value)} style={{padding:'8px 14px',borderRadius:8,border:'1px solid var(--border)',fontSize:13,minWidth:140}}>
            <option value="">Tat ca gia</option>
            <option value="sale">Dang giam gia</option>
            <option value="new">Moi nhat</option>
          </select>
          <span style={{fontSize:13,color:'var(--muted)'}}>Sap xep:</span>
          {[['newest','Moi nhat'],['price_asc','Gia tang'],['price_desc','Gia giam']].map(([v,l])=>(
            <button key={v} onClick={()=>setSort(v)} style={{background:sort===v?'var(--rose)':'var(--warm)',color:sort===v?'#fff':'var(--muted)',padding:'6px 14px',border:'none',borderRadius:20,cursor:'pointer',fontSize:13,fontWeight:600}}>{l}</button>
          ))}
        </div>
        {sorted.length===0 ? (
          <div style={{textAlign:'center',padding:80}}>
            <div style={{fontSize:60,marginBottom:16}}>Tim kiem</div>
            <div style={{fontSize:20,fontWeight:700,marginBottom:8}}>Khong tim thay ket qua</div>
            <div style={{color:'var(--muted)',marginBottom:20}}>Thu tim kiem voi tu khoa khac</div>
            <button className="btn btn-primary" onClick={()=>navigate('home')}>Ve trang chu</button>
          </div>
        ) : <div className="grid-4">{sorted.map(p=><ProductCard key={p.id} p={p}/>)}</div>}
      </div>
    </div>
  );
}