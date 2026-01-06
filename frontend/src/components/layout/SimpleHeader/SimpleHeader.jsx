import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logos/guelmim-snacks-logo.png';
import styles from './SimpleHeader.module.css';

function SimpleHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="Retour à l'accueil" className={styles.logo} />
      </Link>
    </header>
  );
}

export default SimpleHeader;