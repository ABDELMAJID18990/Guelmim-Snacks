import React from 'react';

// On importe les icônes qu'on va utiliser
import { FiClock, FiHeart, FiPlus } from 'react-icons/fi';

// Importation des styles et de l'image de substitution
import styles from './DishCard.module.css';
import placeholderImage from '../../../assets/images/dish-placeholder.png';

// Le composant reçoit un objet 'dish' en prop
function DishCard({ dish = {} }) {
  // On déstructure les données avec des valeurs par défaut
  const {
    name = "Nom du Plat",
    description = "Une description courte et alléchante des ingrédients de ce plat.",
    price = "N/A",
    prepTime = "N/A",
    imageUrl = placeholderImage
  } = dish;

  return (
    <div className={styles.card}>
      {/* --- Section Image et Actions rapides --- */}
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.dishImage} />
        {/* On réutilise le bouton "favori" comme sur la SnackCard */}
        <button className={styles.favoriteButton} aria-label="Ajouter aux favoris">
          <FiHeart />
        </button>
      </div>

      {/* --- Section Contenu Textuel --- */}
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>

        {/* --- Pied de Carte avec Prix et Temps de Préparation --- */}
        <div className={styles.footer}>
          <span className={styles.price}>{price.toFixed(2)} DH</span>
          
          <div className={styles.prepTime}>
            <FiClock className={styles.icon} />
            <span>{prepTime}</span>
          </div>
        </div>
      </div>
      
      {/* --- Bouton d'Action "Ajouter" --- */}
      {/* Ce bouton est positionné par-dessus l'image, pour un look moderne */}
      <button className={styles.addButton} aria-label="Ajouter au panier">
        <FiPlus />
      </button>
    </div>
  );
}

export default DishCard;