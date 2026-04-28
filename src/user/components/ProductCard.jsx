import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Stars from './Stars';
import { fmt } from './fmt';

export default function ProductCard({ p }) {
  const { addToCart, navigate } = useContext(AppContext);

  const name = p.productName || p.name;
  const price = p.price;
  const sale = p.salePrice || p.sale;
  const rating = p.rating || 0;
  const reviews = p.reviewCount || p.reviews || 0;
  const sold = p.soldQuantity || p.sold || 0;
  const badge = p.badge;
  const isNew = p.isNew;
  const img = p.imageUrl || p.img;

  const cartItem = { id: p.id, name, price, sale, img, rating, reviews, sold, badge, isNew };

  return (
    <div className="card" style={{cursor:'pointer'}}>
      <div onClick={() => navigate('product', {id:p.id})}>
        <div className="product-img" style={{position:'relative'}}>
          {img && img.startsWith('http')
            ? <img src={img} alt={name} style={{width:'100%',height:180,objectFit:'cover'}} />
            : <span style={{fontSize:70,display:'flex',alignItems:'center',justifyContent:'center',height:180,background:'var(--warm)'}}>{img || name?.charAt(0)}</span>
          }
          <div style={{position:'absolute',top:10,left:10,display:'flex',flexDirection:'column',gap:4}}>
            {badge === 'sale' && <span className="badge badge-sale">Giam gia</span>}
            {(badge === 'new' || isNew) && <span className="badge badge-new">Moi</span>}
            {badge === 'hot' && <span className="badge badge-hot">Ban chay</span>}
          </div>
        </div>
        <div style={{padding:'14px 16px'}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:6,lineHeight:1.3}}>{name}</div>
          <div style={{marginBottom:6}}>
            <Stars n={rating} /> <span style={{fontSize:12,color:'var(--muted)'}}>({reviews}) - Da ban {sold}</span>
          </div>
          <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:12}}>
            <span style={{color:'var(--rose)',fontWeight:800,fontSize:17}}>{fmt(sale || price)}</span>
            {sale && <span style={{textDecoration:'line-through',color:'var(--muted)',fontSize:13}}>{fmt(price)}</span>}
          </div>
        </div>
      </div>
      <div style={{padding:'0 16px 16px'}}>
        <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={() => addToCart(cartItem)}>Them vao gio</button>
      </div>
    </div>
  );
}
