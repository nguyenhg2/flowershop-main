import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Header from './user/components/Header';
import Footer from './user/components/Footer';
import { LoginModal, RegisterModal } from './user/components/AuthModals';
import Home from './user/pages/Home';
import Cart from './user/pages/Cart';
import { SearchPage } from './user/pages/Search';
import { CategoryPage } from './user/pages/Category';
import { ProductDetailPage } from './user/pages/ProductDetail';
import { ProfilePage } from './user/pages/Profile';
import { ContactPage } from './user/pages/Contact';
import { CheckoutPage } from './user/pages/Checkout';

function App() {
  const { page, showLogin, showRegister } = useContext(AppContext);

  const renderPage = () => {
    switch(page) {
      case 'home': return <Home />;
      case 'cart': return <Cart />;
      case 'checkout': return <CheckoutPage />;
      case 'search': return <SearchPage />;
      case 'category': return <CategoryPage />;
      case 'product': return <ProductDetailPage />;
      case 'profile': return <ProfilePage />;
      case 'contact': return <ContactPage />;
      default: return <Home />;
    }
  };

  return (
    <>
      {showLogin && <LoginModal />}
      {showRegister && <RegisterModal />}
      <Header />
      {renderPage()}
      <Footer />
    </>
  );
}
export default App;