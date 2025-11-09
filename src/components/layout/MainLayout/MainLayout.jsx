import { Outlet } from 'react-router-dom'; // <-- Très important !
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function MainLayout({ user, onLogout, cartItems, onAddToCart }) {
  // On récupère le nombre d'articles du panier depuis un contexte plus tard
  const cartItemCount = 0; 

  return (
    <div className="app-container"> {/* Vous pouvez réutiliser votre CSS existant */}
      <Navbar 
      cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
       user={user} 
       onLogout={onLogout} />
      <main className="main-content">
         {/* C'est une façon de transmettre des props aux enfants d'un layout */}
        <Outlet context={{ onAddToCart: onAddToCart }} /> {/* <-- La page (HomePage, SnackPage...) s'affichera ici */}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;