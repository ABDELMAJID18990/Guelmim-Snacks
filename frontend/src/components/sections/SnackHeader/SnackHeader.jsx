import React from 'react';

// Importation des icônes
import { FiMapPin, FiPhone } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaTiktok  } from 'react-icons/fa';

// Importation des styles
import styles from './SnackHeader.module.css';
import logoPlaceholder from '../../../assets/logos/logo-placeholder.png'; // Un logo de substitution

function SnackHeader({ snack = {} }) {
  // On déstructure les données avec des valeurs par défaut
  const {
    name = "Nom du Snack",
    description = "Une description chaleureuse et accueillante du snack, de son histoire et de ses spécialités...",
    address = "Adresse non disponible",
    phone = "N/A",
    logoUrl = logoPlaceholder,
    socials = {}
  } = snack;

  return (
    <header className={styles.header}>
      {/* --- Colonne de Gauche : Logo --- */}
      <div className={styles.logoContainer}>
        <img src={logoUrl} alt={`Logo de ${name}`} className={styles.logo} />
      </div>

      {/* --- Colonne de Droite : Informations --- */}
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.description}>{description}</p>
        
        {/* --- Informations de contact --- */}
        <div className={styles.contactList}>
          <div className={styles.contactItem}>
            <FiMapPin className={styles.icon} />
            <span>{address}</span>
          </div>
          <div className={styles.contactItem}>
            <FiPhone className={styles.icon} />
            <span>{phone}</span>
          </div>
        </div>

        {/* --- Réseaux Sociaux --- */}
        <div className={styles.socialList}>
          {socials.instagram && <a href={socials.instagram} aria-label="Instagram"><FaInstagram /></a>}
          {socials.facebook && <a href={socials.facebook} aria-label="Facebook"><FaFacebookF /></a>}
          {socials.tiktok && <a href={socials.tiktok} aria-label="TikTok"><FaTiktok /></a>}        </div>
      </div>
    </header>
  );
}

export default SnackHeader;