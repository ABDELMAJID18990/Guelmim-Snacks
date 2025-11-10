import React from 'react';
import styles from './Badge.module.css';

// Le composant reçoit le texte (children) et une prop booléenne 'isActive'
function Badge({ children, isActive = false, onClick }) {

  // On construit les classes dynamiquement :
  // - On met toujours la classe de base .badge
  // - Si isActive est true, on ajoute la classe .active
  const badgeClasses = `${styles.badge} ${isActive ? styles.active : ''}`;

  return (
    <button className={badgeClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Badge;