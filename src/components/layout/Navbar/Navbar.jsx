import React, { useState } from 'react';

import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';
import logo from '../../../assets/logos/guelmim-snacks-logo.png'; 

function Navbar({user, onLogout, cartItemCount}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState("accueil");


  return (
    <header className={styles.navbar}>
      {/* Côté Gauche : Logo */}
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="Guelmim Snacks Logo" className={styles.logo} />
      </Link>

      {/* Côté Droit : Liens de Navigation */}
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

          <Link to="/cart" className={styles.cartWrapper}>
            <button className={styles.iconButton} aria-label="Panier">
              <FiShoppingCart />
            </button>
            
            {/* 2. AFFICHAGE CONDITIONNEL DE LA NOTIFICATION */}
            {cartItemCount > 0 && (
              <span className={styles.cartNotification}>{cartItemCount}</span>
            )}

          </Link>
          
          {/* 2. LA MODIFICATION PRINCIPALE : L'AFFICHAGE CONDITIONNEL */}
          {user ? (
            // Si un utilisateur EST connecté
            <>
              
              
              <button onClick={onLogout} className={styles.logoutButton}>
                Déconnexion
              </button>
            </>
          ) : (
            // Si personne N'EST connecté
            <Link to="/login" className={styles.outlineButton}>
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Menu Hamburger pour les petits écrans */}
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {menuOpen && (
        <div className={styles.navMobile}>
          {/* Section du haut : liens de navigation */}
          <ul className={styles.navMobileLinks}>
                       
            <li>
              <Link className={menu==="accueil" ? styles.active : ""} onClick={()=>{
              setMenu("accueil")
              setMenuOpen(false)
              }} to="/">Accueil</Link>
              </li>
            <li>
              <Link className={menu==="snacks" ? styles.active : ""} onClick={()=>{
              setMenu("snacks")
              setMenuOpen(false)
              }} to="/snacks">Snacks</Link>
              </li>
            <li>
              <Link className={menu==="menu" ? styles.active : ""} onClick={()=>{
              setMenu("menu")
              setMenuOpen(false)
              }} to="/menu">Menu</Link>
              </li>

          </ul>

          {/* Section du bas : actions et connexion */}
          <div className={styles.navMobileActions}>
            <div className={styles.mobileActionButtons}>
              <button className={styles.iconButton} aria-label="Rechercher">
                <FiSearch />
                <span>Rechercher</span>
              </button>

              <Link to="/cart" className={styles.iconButton} onClick={() => setMenuOpen(false)}>
                <FiShoppingCart />
                <span>Panier</span>
                {cartItemCount > 0 && (
                  <span className={styles.cartNotification}>{cartItemCount}</span>
                )}
              </Link>
            </div>
            
            {user ? (
              <div className={styles.mobileUserSection}>
                <button onClick={() => { onLogout(); setMenuOpen(false); }} className={styles.logoutButtonMobile}>
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link to="/login" className={styles.loginButtonMobile} onClick={() => setMenuOpen(false)}>
                Connexion / Inscription
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;