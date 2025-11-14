import React from 'react';
import { Link } from 'react-router-dom';

// Importation des icônes pour les réseaux sociaux
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// Importation des styles et du logo
import styles from './Footer.module.css';
import logo from '../../../assets/logos/guelmim-snacks-logo.png'; // Assurez-vous d'avoir une version du logo adaptée aux fonds sombres

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* --- Colonne 1 : Identité --- */}
        <div className={styles.column}>
          <img src={logo} alt="Guelmim Snacks Logo" className={styles.logo} />
          <p className={styles.description}>
            La façon la plus simple de commander auprès de vos snacks préférés à Guelmim. Commandez en ligne et récupérez votre repas chaud, sans attente.
          </p>
          <div className={styles.socialIcons}>
            <Link to="#" aria-label="Facebook"><FaFacebookF /></Link>
            <Link to="#" aria-label="Instagram"><FaInstagram /></Link>
            <Link to="#" aria-label="Whatsapp"><FaWhatsapp /></Link>
          </div>
        </div>

        {/* --- Colonne 2 : Navigation --- */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Navigation</h3>
          <ul className={styles.linkList}>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/snacks">Snacks</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/login">Mon Compte</Link></li>
          </ul>
        </div>

        {/* --- Colonne 3 : À Propos --- */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Guelmim Snacks</h3>
          <ul className={styles.linkList}>
            <li><Link to="#">Comment ça marche ?</Link></li>
            <li><Link to="/devenir-partenaire">Devenir Partenaire</Link></li>
            <li><Link to="#">Contactez-nous</Link></li>
          </ul>
        </div>

        {/* --- Colonne 4 : Contact --- */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Contact</h3>
          <ul className={styles.linkList}>
            <li><Link to="mailto:[email protected]">abdelmajid.elainousi@gmail.com</Link></li>
            <li><span>Guelmim, Maroc</span></li>
          </ul>
        </div>
      </div>

      {/* --- Ligne de Copyright --- */}
      <div className={styles.copyrightBar}>
        <p>© {new Date().getFullYear()} Guelmim Snacks. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;