import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES, REVIEWS } from '../../data/flowerData';
import ProductCard from '../components/ProductCard';
import Stars from '../components/Stars';
import { fmt } from '../components/fmt';

export function ProductDetailPage() {
  const {pageParams, navigate, addToCart, cart, user, setShowLogin} = useContext(AppContext);
  const p = PRODUCTS.find(x=>x.id===pageParams.id);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  const [myStars, setMyStars] = useState(0);
  const [myReview, setMyReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [localReviews, setLocalReviews] = useState(REVIEWS[pageParams.id]||[]);

  if(!p) return <div className="container" style={{padding:60,textAlign:'center'}}>Khong tim thay san pham</div>;

  const related = PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);
  const discount = p.sale ? Math.round((1-p.sale/p.price)*100) : 0;

  const submitReview = () => {
    if(!user){setShowLogin(true); return;}
    if(!myStars||!myReview.trim()) return;
    setLocalReviews(r=>[{id:Date.now(),user:user.name,stars:myStars,date:new Date().toISOString().split('T')[0],text:myReview,avatar:user.name[0]}, ...r]);
    setMyStars(0); setMyReview(''); setSubmitted(true);
  };

  return (
    <div className="page">
      <div style={{background:'var(--warm)',padding:'14px 0',marginBottom:28}}>
        <div className="container" style={{fontSize:13,color:'var(--muted)'}}>
          <span style={{cursor:'pointer'}} onClick={()=>navigate('home')}>Trang chu</span> {'>'}{' '}
          <span style={{cursor:'pointer'}} onClick={()=>navigate('category',{cat:p.cat})}>{CATEGORIES.find(c=>c.id===p.cat)?.name}</span> {'>'}{' '}
          {p.name}
        </div>
      </div>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,marginBottom:48}}>
          <div>
            <div style={{background:'var(--warm)',borderRadius:20,aspectRatio:'1',display:'flex',alignItems:'center',justifyContent:'center',fontSize:120}}>{p.img}</div>
          </div>
          <div>
            {p.isNew&&<span className="badge badge-new" style={{marginBottom:10,display:'inline-block'}}>Hang moi ve</span>}
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:28,marginBottom:10,lineHeight:1.3}}>{p.name}</h1>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <Stars n={p.rating} size={16}/>
              <span style={{fontSize:14,color:'var(--muted)'}}>{p.rating} ({p.reviews} danh gia) · Da ban <b>{p.sold}</b></span>
            </div>
            <div style={{display:'flex',gap:14,alignItems:'baseline',marginBottom:20}}>
              <span style={{fontSize:32,fontWeight:800,color:'var(--rose)'}}>{fmt(p.sale||p.price)}</span>
              {p.sale&&<><span style={{textDecoration:'line-through',color:'var(--muted)',fontSize:18}}>{fmt(p.price)}</span>
              <span className="badge badge-sale">-{discount}%</span></>}
            </div>
            <div className="divider"/>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:13,color:'var(--muted)',marginBottom:8,fontWeight:700,textTransform:'uppercase',letterSpacing:.4}}>So luong</div>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div className="qty-ctrl">
                  <button className="qty-btn" style={{borderRadius:'8px 0 0 8px'}} onClick={()=>setQty(q=>Math.max(1,q-1))}>-</button>
                  <input className="qty-num" value={qty} onChange={e=>setQty(Math.max(1,+e.target.value||1))} style={{width:44}}/>
                  <button className="qty-btn" style={{borderRadius:'0 8px 8px 0'}} onClick={()=>setQty(q=>q+1)}>+</button>
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:12}}>
              <button className="btn btn-primary" style={{flex:1,justifyContent:'center',fontSize:15,padding:'12px'}} onClick={()=>addToCart(p,qty)}>Them vao gio</button>
              <button className="btn btn-outline" style={{flex:1,justifyContent:'center',fontSize:15,padding:'12px'}} onClick={()=>{addToCart(p,qty);navigate('cart')}}>Mua ngay</button>
            </div>
            <div className="divider"/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {[['Giao hang 2-4h'],['Hoa tuoi dam bao'],['Doi tra 24h'],['Tu van mien phi']].map(([t])=>(
                <div key={t} style={{display:'flex',gap:8,alignItems:'center',fontSize:13,color:'var(--muted)'}}>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{borderBottom:'2px solid var(--border)',marginBottom:24,display:'flex',gap:0}}>
          {[['desc','Mo ta san pham'],['review','Danh gia ('+localReviews.length+')']].map(([k,l])=>(
            <button key={k} onClick={()=>setActiveTab(k)} style={{padding:'12px 24px',border:'none',background:'none',cursor:'pointer',fontWeight:700,fontSize:15,borderBottom:`3px solid ${activeTab===k?'var(--rose)':'transparent'}`,color:activeTab===k?'var(--rose)':'var(--muted)',marginBottom:-2}}>
              {l}
            </button>
          ))}
        </div>

        {activeTab==='desc' && (
          <div style={{lineHeight:1.9,color:'var(--text)',maxWidth:700,marginBottom:48}}>{p.desc}<br/><br/>
            <strong>Thong tin them:</strong><br/>
            • Hoa tuoi nhap ve hang ngay tu Da Lat va nhap khau<br/>
            • Dong goi can than, bao dam hoa tuoi khi giao den tay<br/>
            • Co the yeu cau thiep kem theo (mien phi)<br/>
            • Lien he de tu van mau thiet ke rieng theo yeu cau
          </div>
        )}

        {activeTab==='review' && (
          <div style={{marginBottom:48}}>
            {submitted&&<div className="alert alert-success" style={{marginBottom:20}}>Cam on ban da danh gia san pham!</div>}
            <div style={{background:'var(--warm)',borderRadius:16,padding:24,marginBottom:28}}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>Viet danh gia cua ban</div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:13,color:'var(--muted)',marginBottom:8,fontWeight:600}}>Chon sao:</div>
                <div style={{display:'flex',gap:4}}>
                  {[1,2,3,4,5].map(n=>(
                    <span key={n} onClick={()=>setMyStars(n)} style={{fontSize:28,cursor:'pointer',color:n<=myStars?'var(--gold)':'#ccc',transition:'color .1s'}}>★</span>
                  ))}
                </div>
              </div>
              <textarea value={myReview} onChange={e=>setMyReview(e.target.value)} placeholder="Chia se trai nghiem cua ban ve san pham nay..." rows={3} style={{marginBottom:12}}/>
              <button className="btn btn-primary" onClick={submitReview}>Gui danh gia</button>
            </div>
            {localReviews.length===0 ? <div style={{textAlign:'center',padding:40,color:'var(--muted)'}}>Chua co danh gia nao. Hay la nguoi dau tien!</div> :
            localReviews.map(r=>(
              <div key={r.id} style={{borderBottom:'1px solid var(--border)',paddingBottom:20,marginBottom:20}}>
                <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
                  <div style={{width:38,height:38,borderRadius:'50%',background:'var(--rose-light)',color:'var(--rose)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:16}}>{r.avatar||r.user[0]}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14}}>{r.user}</div>
                    <div style={{fontSize:12,color:'var(--muted)'}}>{r.date}</div>
                  </div>
                  <Stars n={r.stars} size={14}/>
                </div>
                <div style={{fontSize:14,lineHeight:1.7,color:'var(--text)'}}>{r.text}</div>
              </div>
            ))}
          </div>
        )}

        {related.length>0&&(
          <div>
            <div className="section-title" style={{marginBottom:20}}>San pham lien quan</div>
            <div className="grid-4">{related.map(p=><ProductCard key={p.id} p={p}/>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}