import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import API from '../../api/index';

export default function Footer() {
  const { navigate } = useContext(AppContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.get('/categories').then(res => setCategories(res.data)).catch(() => {});
  }, []);

  return (
    <footer style={{background:'#2d2017',color:'#d4b8a8',padding:'48px 0 24px',marginTop:60}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:32,marginBottom:32}}>
          <div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:22,color:'#f7d6df',marginBottom:12}}>Mong Lan Flower</div>
            <p style={{fontSize:13,lineHeight:1.8}}>Shop hoa tuoi cao cap - Nang niu tung bong hoa, tran trong tung cam xuc.</p>
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:'#f7d6df',marginBottom:14,textTransform:'uppercase',letterSpacing:.5}}>Danh muc</div>
            {categories.map(c => <div key={c.id} onClick={() => navigate('category', {cat:c.slug, catId:c.dbId})} style={{cursor:'pointer',padding:'4px 0',fontSize:13,transition:'color .2s'}} onMouseEnter={e => e.target.style.color='#f7d6df'} onMouseLeave={e => e.target.style.color=''}>{c.name}</div>)}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:'#f7d6df',marginBottom:14,textTransform:'uppercase',letterSpacing:.5}}>Thong tin</div>
            {['Ve chung toi','Chinh sach giao hang','Chinh sach doi tra','Huong dan dat hang'].map(t => <div key={t} style={{cursor:'pointer',padding:'4px 0',fontSize:13}}>{t}</div>)}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:'#f7d6df',marginBottom:14,textTransform:'uppercase',letterSpacing:.5}}>Lien he</div>
            <div style={{fontSize:13,lineHeight:2}}>
              <div>123 Duong Hoa Mai, Q.1, TP.HCM</div>
              <div>0901 234 567</div>
              <div>hello@monglan.vn</div>
              <div>7:00 - 21:00 moi ngay</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,.1)',paddingTop:20,textAlign:'center',fontSize:12,color:'#9a7a68'}}>
          2024 Mong Lan Flower. Tat ca quyen duoc bao luu.
        </div>
      </div>
    </footer>
  );
}
