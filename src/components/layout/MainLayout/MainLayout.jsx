import React from 'react';
import { Outlet } from 'react-router-dom'; // <-- Très important !
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function MainLayout() {
  // On récupère le nombre d'articles du panier depuis un contexte plus tard
  const cartItemCount = 0; 

  return (
    <div className="app-container"> {/* Vous pouvez réutiliser votre CSS existant */}
      <Navbar cartItemCount={cartItemCount} />
      <main className="main-content">
        <Outlet /> {/* <-- La page (HomePage, SnackPage...) s'affichera ici */}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;