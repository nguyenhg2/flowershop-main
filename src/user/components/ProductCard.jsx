import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Stars from './Stars';
import { fmt } from './fmt';

export default function ProductCard({p, horizontal}) {
  const {addToCart, navigate} = useContext(AppContext);
  if(horizontal) return (
    <div className="card" style={{display:'flex',gap:0}} onClick={()=>navigate('product',{id:p.id})}>
      <div className="product-img" style={{width:100,minWidth:100,fontSize:36,background:'var(--warm)'}}>{p.img}</div>
      <div style={{padding:'12px 16px',flex:1}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{p.name}</div>
        <Stars n={p.rating} size={12}/> <span style={{fontSize:11,color:'var(--muted)'}}>({p.reviews})</span>
        <div style={{marginTop:6,display:'flex',gap:10,alignItems:'center'}}>
          <span style={{color:'var(--rose)',fontWeight:800,fontSize:15}}>{fmt(p.sale||p.price)}</span>
          {p.sale&&<span style={{textDecoration:'line-through',color:'var(--muted)',fontSize:12}}>{fmt(p.price)}</span>}
        </div>
      </div>
    </div>
  );
  return (
    <div className="card" style={{cursor:'pointer'}}>
      <div onClick={()=>navigate('product',{id:p.id})}>
        <div className="product-img" style={{position:'relative'}}>
          <span style={{fontSize:70,display:'flex',alignItems:'center',justifyContent:'center',height:180,background:'var(--warm)'}}>{p.img}</span>
          <div style={{position:'absolute',top:10,left:10,display:'flex',flexDirection:'column',gap:4}}>
            {p.badge==='sale'&&<span className="badge badge-sale">Giảm giá</span>}
            {p.badge==='new'||p.isNew?<span className="badge badge-new">Mới</span>:null}
            {p.badge==='hot'&&<span className="badge badge-hot">Bán chạy</span>}
          </div>
        </div>
        <div style={{padding:'14px 16px'}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:6,lineHeight:1.3}}>{p.name}</div>
          <div style={{marginBottom:6}}><Stars n={p.rating}/> <span style={{fontSize:12,color:'var(--muted)'}}>({p.reviews}) · Đã bán {p.sold}</span></div>
          <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:12}}>
            <span style={{color:'var(--rose)',fontWeight:800,fontSize:17}}>{fmt(p.sale||p.price)}</span>
            {p.sale&&<span style={{textDecoration:'line-through',color:'var(--muted)',fontSize:13}}>{fmt(p.price)}</span>}
          </div>
        </div>
      </div>
      <div style={{padding:'0 16px 16px'}}>
        <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={()=>addToCart(p)}> Thêm vào giỏ</button>
      </div>
    </div>
  );
}