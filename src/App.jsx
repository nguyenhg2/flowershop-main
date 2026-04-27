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
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminProducts } from './admin/pages/AdminProducts';
import { AdminCategories } from './admin/pages/AdminCategories';
import { AdminOrders } from './admin/pages/AdminOrders';
import { AdminCustomers } from './admin/pages/AdminCustomers';
import { AdminReviews } from './admin/pages/AdminReviews';
import { AdminBanners } from './admin/pages/AdminBanners';
import { AdminContact } from './admin/pages/AdminContact';
import { AdminReports } from './admin/pages/AdminReports';

function App() {
  const { page, showLogin, showRegister } = useContext(AppContext);
  
  const renderPage = () => {
    if (page.startsWith('admin-')) {
      switch(page) {
        case 'admin-login': return <AdminLogin />;
        case 'admin-dashboard': return <AdminDashboard />;
        case 'admin-products': return <AdminProducts />;
        case 'admin-categories': return <AdminCategories />;
        case 'admin-orders': return <AdminOrders />;
        case 'admin-customers': return <AdminCustomers />;
        case 'admin-reviews': return <AdminReviews />;
        case 'admin-banners': return <AdminBanners />;
        case 'admin-contact': return <AdminContact />;
        case 'admin-reports': return <AdminReports />;
        default: return <AdminDashboard />;
      }
    }
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

  if (page.startsWith('admin-') && page !== 'admin-login') {
    return (
      <>
        {showLogin && <LoginModal />}
        {showRegister && <RegisterModal />}
        {renderPage()}
      </>
    );
  }

  return (
    <>
      {showLogin && <LoginModal />}
      {showRegister && <RegisterModal />}
      {page === 'admin-login' ? renderPage() : <Header />}
      {renderPage()}
      {page !== 'admin-login' && <Footer />}
    </>
  );
}
export default App;
