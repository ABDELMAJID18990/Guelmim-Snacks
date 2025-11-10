import React from 'react';
import styles from './CategoryCard.module.css';
import { Link } from 'react-router-dom';

// Le composant reçoit les données d'une catégorie en prop
function CategoryCard({ category }) {
  // Destructuring avec des valeurs par défaut au cas où
  const { name = 'Catégorie', imageUrl = 'https://via.placeholder.com/150' } = category;

  return (
    <div className={styles.card}>
      {/* On utilise une balise <a> si on veut que la carte soit un lien direct */}
      <Link to={`/menu?category=${name}`} className={styles.cardLink}>
        <img src={imageUrl} alt={name} className={styles.cardImage} />
        <div className={styles.overlay}></div>
        <h3 className={styles.cardTitle}>{name}</h3>
      </Link>
    </div>
  );
}

export default CategoryCard;