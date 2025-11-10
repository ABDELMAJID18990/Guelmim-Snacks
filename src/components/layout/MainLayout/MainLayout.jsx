import { Outlet } from 'react-router-dom'; // <-- Très important !
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';

function MainLayout({ user, onLogout}) {
    const cartItems = useSelector(state => state.cart);
    const cartItemCount = cartItems ? 
    cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
  return (
    <div className="app-container"> 
      <Navbar 
      cartItemCount={cartItemCount}
       user={user} 
       onLogout={onLogout} />
      <main className="main-content">
        <Outlet /> {/* <-- La page (HomePage, SnackPage...) s'affichera ici */}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;