import React from 'react';
import styles from './BecomePartnerSection.module.css';

function BecomePartnerSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Vous êtes propriétaire d'un snack ?</h2>
          <p className={styles.description}>
            Rejoignez Guelmim Snacks pour augmenter votre visibilité, recevoir plus de commandes à emporter et optimiser votre service. L'inscription est simple et rapide.
          </p>
        </div>
        <a href="/register-partner" className={styles.ctaButton}>
          Devenir Partenaire
        </a>
      </div>
    </section>
  );
}

export default BecomePartnerSection;