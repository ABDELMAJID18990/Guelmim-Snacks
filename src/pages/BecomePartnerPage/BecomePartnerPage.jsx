import React from 'react';
import styles from './BecomePartnerPage.module.css';
import { Link } from 'react-router-dom';

// On peut importer des icônes pour illustrer les avantages
import { FiTrendingUp, FiCheckCircle, FiClock } from 'react-icons/fi';

function BecomePartnerPage() {
  return (
    <div className={styles.page}>
      {/* --- Section Principale (Haut de Page) --- */}
      <header className={styles.header}>
        <h1>Rejoignez l'aventure Guelmim Snacks</h1>
        <p>Développez votre activité, atteignez plus de clients et simplifiez la gestion de vos commandes à emporter.</p>
      </header>

      {/* --- Section des Avantages --- */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <FiTrendingUp className={styles.icon} />
            <h3>Augmentez vos Ventes</h3>
            <p>Gagnez en visibilité auprès de milliers de clients affamés à Guelmim et recevez plus de commandes chaque jour.</p>
          </div>
          <div className={styles.benefitCard}>
            <FiCheckCircle className={styles.icon} />
            <h3>Simplifiez votre Travail</h3>
            <p>Recevez des commandes claires et standardisées sur un tableau de bord simple. Fini les erreurs des commandes par téléphone !</p>
          </div>
          <div className={styles.benefitCard}>
            <FiClock className={styles.icon} />
            <h3>Optimisez votre Temps</h3>
            <p>Notre système de suivi en temps réel permet aux clients de venir uniquement lorsque la commande est prête, fluidifiant le service.</p>
          </div>
        </div>
      </section>

      {/* --- Section "Comment ça marche ?" --- */}
      <section className={styles.howItWorksSection}>
        <h2>C'est simple comme bonjour</h2>
        <div className={styles.steps}>
            <p><span>1.</span> Inscrivez votre restaurant.</p>
            <p><span>2.</span> Ajoutez votre menu en quelques clics.</p>
            <p><span>3.</span> Commencez à recevoir des commandes !</p>
        </div>
      </section>

      {/* --- Section d'Appel à l'Action (CTA) --- */}
      <section className={styles.ctaSection}>
        <h2>Prêt à développer votre business ?</h2>
        <Link to="/register-partner" className={styles.ctaButton}>
          Inscrire mon restaurant
        </Link>
      </section>
    </div>
  );
}

export default BecomePartnerPage;