import React from 'react';
import { NavLink, Link } from 'react-router-dom'; // On importe NavLink et Link

// Importation des icônes
import { FiGrid, FiList, FiUser, FiLogOut } from 'react-icons/fi';

// Importation des styles et du logo
import styles from './DashboardSidebar.module.css';
import logo from '../../../assets/logos/guelmim-snacks-logo.png'; // Utilisez une version adaptée (blanche ou sombre)

function DashboardSidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* --- Section du Haut : Logo --- */}
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="Logo Guelmim Snacks" className={styles.logo} />
      </Link>
      
      {/* --- Section du Milieu : Navigation Principale --- */}
      <nav className={styles.navigation}>
        <h3 className={styles.menuTitle}>Menu Principal</h3>
        <ul>
          <li>
            <NavLink 
              to="/dashboard/orders" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              <FiGrid className={styles.icon} />
              <span>Commandes</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/menu"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              <FiList className={styles.icon} />
              <span>Mon Menu</span>
            </NavLink>
          </li>
          {/* Ajoutez d'autres liens ici si nécessaire, ex: "Statistiques" */}
        </ul>
      </nav>

      {/* --- Espace flexible pour pousser la dernière section en bas --- */}
      <div className={styles.spacer}></div>

      {/* --- Section du Bas : Compte Utilisateur --- */}
      <div className={styles.accountSection}>
        <ul>
          <li>
            <NavLink 
              to="/dashboard/account"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              <FiUser className={styles.icon} />
              <span>Mon Compte</span>
            </NavLink>
          </li>
          <li>
            <button className={`${styles.navLink} ${styles.logoutButton}`}>
              <FiLogOut className={styles.icon} />
              <span>Déconnexion</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
