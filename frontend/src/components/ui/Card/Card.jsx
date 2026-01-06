import React from 'react';
import styles from './Card.module.css';

// Le composant Card reçoit une prop 'className' optionnelle
// pour pouvoir ajouter des styles spécifiques depuis l'extérieur si besoin.
function Card({ children, className }) {
  // On combine la classe de base .card avec toute classe supplémentaire.
  const cardClasses = `${styles.card} ${className || ''}`;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}

export default Card;