import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/flowerData';
import ProductCard from '../components/ProductCard';

export function CategoryPage() {
  const {pageParams, navigate, addToCart} = useContext(AppContext);
  const [sort, setSort] = useState(pageParams.sort||'newest');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(5000000);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 12;

  const cat = pageParams.cat;
  const catInfo = CATEGORIES.find(c=>c.id===cat);

  let filtered = cat ? PRODUCTS.filter(p=>p.cat===cat) : PRODUCTS;
  if(pageParams.filter==='sale') filtered = filtered.filter(p=>p.sale);
  filtered = filtered.filter(p=>(p.sale||p.price)>=priceMin && (p.sale||p.price)<=priceMax);

  if(sort==='price_asc') filtered = [...filtered].sort((a,b)=>(a.sale||a.price)-(b.sale||b.price));
  else if(sort==='price_desc') filtered = [...filtered].sort((a,b)=>(b.sale||b.price)-(a.sale||a.price));
  else if(sort==='sold') filtered = [...filtered].sort((a,b)=>b.sold-a.sold);
  else filtered = [...filtered].sort((a,b)=>b.id-a.id);

  const totalPages = Math.ceil(filtered.length/PER_PAGE);
  const paged = filtered.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE);

  return (
    <div className="page">
      <div style={{background:'var(--warm)',padding:'28px 0',marginBottom:28}}>
        <div className="container">
          <div style={{fontSize:13,color:'var(--muted)',marginBottom:4}}>
            <span style={{cursor:'pointer'}} onClick={()=>navigate('home')}>Trang chủ</span> › {catInfo?catInfo.name:'Tất cả sản phẩm'}
          </div>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:28}}>{catInfo?catInfo.name:'Tất cả sản phẩm'}</div>
          <div style={{fontSize:14,color:'var(--muted)',marginTop:4}}>{filtered.length} sản phẩm</div>
        </div>
      </div>
      <div className="container" style={{display:'grid',gridTemplateColumns:'240px 1fr',gap:28,alignItems:'start'}}>
        <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:20,position:'sticky',top:80}}>
          <div style={{fontWeight:800,fontSize:15,marginBottom:16}}>Bộ lọc</div>
          <div style={{marginBottom:20}}>
            <div className="form-group"><label>Khoảng giá</label></div>
            <div style={{display:'flex',gap:8}}>
              <input type="number" value={priceMin} onChange={e=>setPriceMin(+e.target.value)} placeholder="Từ" style={{fontSize:13}}/>
              <input type="number" value={priceMax} onChange={e=>setPriceMax(+e.target.value)} placeholder="Đến" style={{fontSize:13}}/>
            </div>
          </div>
          <div>
            <div className="form-group"><label>Danh mục</label></div>
            {CATEGORIES.map(c=>(
              <div key={c.id} onClick={()=>navigate('category',{cat:c.id})} style={{padding:'8px 12px',borderRadius:8,cursor:'pointer',fontSize:14,background:cat===c.id?'var(--rose-light)':'',color:cat===c.id?'var(--rose)':'var(--text)',fontWeight:cat===c.id?700:400,marginBottom:2}}>
                {c.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{display:'flex',gap:8,marginBottom:20,alignItems:'center',flexWrap:'wrap'}}>
            <span style={{fontSize:13,color:'var(--muted)'}}>Sắp xếp:</span>
            {[['newest','Mới nhất'],['price_asc','Giá ↑'],['price_desc','Giá ↓'],['sold','Bán chạy']].map(([v,l])=>(
              <button key={v} className="tag" style={{padding:'6px 14px',fontSize:13}} onClick={()=>{setSort(v);setCurrentPage(1)}}
                data-active={sort===v?'true':'false'}
                onMouseEnter={e=>{if(sort!==v)e.target.style.background='var(--rose-light)'}}
                onMouseLeave={e=>{if(sort!==v)e.target.style.background='var(--warm)'}}
                style={{background:sort===v?'var(--rose)':'var(--warm)',color:sort===v?'#fff':'var(--muted)',padding:'6px 14px',border:'none',borderRadius:20,cursor:'pointer',fontSize:13,fontWeight:600,transition:'all .2s'}}>
                {l}
              </button>
            ))}
          </div>
          {paged.length===0 ? <div style={{textAlign:'center',padding:60,color:'var(--muted)'}}>Không tìm thấy sản phẩm phù hợp</div> :
          <div className="grid-4">{paged.map(p=><ProductCard key={p.id} p={p}/>)}</div>}
          {totalPages>1&&(
            <div className="pagination">
              {Array.from({length:totalPages},(_,i)=>(
                <button key={i} className={`page-btn${currentPage===i+1?' active':''}`} onClick={()=>setCurrentPage(i+1)}>{i+1}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}