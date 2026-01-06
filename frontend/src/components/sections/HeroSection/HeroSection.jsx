import React from 'react';
import styles from './HeroSection.module.css';
import burgerImage from '../../../assets/hero-burger.png';
import { Link } from 'react-router-dom'; 


export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      {/* --- Colonne de Gauche : Texte et Appel à l'Action --- */}
      <div className={styles.textContainer}>
        <h1 className={styles.heroHeadline}>
          Tes snacks préférés à Guelmim, prêts quand tu arrives
        </h1>
        <p className={styles.heroParagraph}>
          Commandez en avance et récupérez votre repas chaud et frais sans aucune attente. Simple, rapide et délicieux.
        </p>
        <Link to="/snacks" className={styles.ctaButton}>
          Voir les Snacks
        </Link>
      </div>
      {/* --- Colonne de Droite : Image --- */}
      <div className={styles.imageContainer}>
        <img 
          src={burgerImage} 
          alt="Burger appétissant" 
          className={styles.heroImage} 
        />
      </div>
    </section>
  )
}
