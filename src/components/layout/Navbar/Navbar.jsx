import React, { useState } from 'react';
// NOUVEAU : Importation des icônes depuis lLink bibliothèque
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Importation des styles et du logo
import styles from './Navbar.module.css';
import logo from '../../../assets/logos/guelmim-snacks-logo.png'; // <-- Assurez-vous que ce chemin est correct !

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState("accueil");


  return (
    <header className={styles.navbar}>
      {/* Côté Gauche : Logo */}
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="Guelmim Snacks Logo" className={styles.logo} />
      </Link>

      {/* Côté Centre & Droit : Liens et Bouton (pour écrans larges) */}
      <nav className={styles.navDesktop}>
        <ul className={styles.navLinks}>
          <li><Link className={menu==="accueil" ? styles.active : ""} onClick={()=>setMenu("accueil")} to="/">Accueil</Link></li>
          <li><Link className={menu==="snacks" ? styles.active : ""} onClick={()=>setMenu("snacks")} to="/snacks">Snacks</Link></li>
          <li><Link className={menu==="menu" ? styles.active : ""} onClick={()=>setMenu("menu")} to="/menu">Menu</Link></li>
        </ul>

         {/* Partie Droite avec les icônes et le bouton */}
        <div className={styles.navActions}>
          <button className={styles.iconButton} aria-label="Rechercher">
            <FiSearch />
          </button>

          <div className={styles.cartWrapper}>
            <button className={styles.iconButton} aria-label="Panier">
              <FiShoppingCart />
            </button>
            <span className={styles.cartNotification}></span>
          </div>
          
          <Link to="/login" className={styles.outlineButton}>
            Sign In
          </Link>
        </div>
      </nav>

      {/* Menu Hamburger pour les petits écrans */}
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {/* Les 3 barres du hamburger */}
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Le menu qui s'ouvre sur mobile */}
      {menuOpen && (
        <div className={styles.navMobile}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="/snacks" onClick={() => setMenuOpen(false)}>Snacks</Link></li>
            <li><Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link></li>
            <li><Link to="/login" className={styles.actionButtonMobile}>Register/Login</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;