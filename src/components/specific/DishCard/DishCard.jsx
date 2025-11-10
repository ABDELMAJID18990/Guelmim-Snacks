import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiHeart, FiPlus } from 'react-icons/fi';
import styles from './DishCard.module.css';
import placeholderImage from '../../../assets/images/dish-placeholder.png';

import { useDispatch } from 'react-redux'; // 
import { addItem } from '../../../store/cartActions';

function DishCard({ dish = {}}) {

  const dispatch = useDispatch();

  // Un SEUL bloc de déstructuration, qui inclut `id` et les valeurs par défaut.
  const { 
    id, 
    name = "Nom du Plat",
    description = "Une description courte...",
    price = 0, // Mieux de mettre 0 comme défaut pour un nombre
    prepTime = "N/A",
    imageUrl = placeholderImage 
  } = dish;

  const handleAddToCartClick = (event) => {
    event.preventDefault(); 
    event.stopPropagation();
    dispatch(addItem({ ...dish, quantity  :1 }));
  };

  return (
    <Link to={`/plat/${id}`} className={styles.cardLink}> 
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={name} className={styles.dishImage} />
          <button className={styles.favoriteButton} aria-label="Ajouter aux favoris">
            <FiHeart />
          </button>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.footer}>
            {/* Ligne modifiée pour éviter une erreur si price est "N/A" */}
            <span className={styles.price}>{typeof price === 'number' ? price.toFixed(2) : price} DH</span>
            <div className={styles.prepTime}>
              <FiClock className={styles.icon} />
              <span>{prepTime}</span>
            </div>
          </div>
        </div>
        
        <button 
          className={styles.addButton}
          aria-label="Ajouter au panier"
          onClick={handleAddToCartClick}
        >
          <FiPlus />
        </button>
      </div>
    </Link>
  );
}

export default DishCard;