// src/pages/DishPage/DishPage.jsx

import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './DishPage.module.css';

// Icônes
import { FiPlus, FiMinus, FiHeart } from 'react-icons/fi';

// On va réutiliser les données factices pour l'instant
import { mockSnackData, mockDishes } from '../../data/mockData';
import DishCard from '../../components/specific/DishCard/DishCard';

// On va utiliser le Context pour récupérer onAddToCart, c'est plus propre !
// import { CartContext } from '../../context/CartContext'; 

function DishPage() {
  const { dishId } = useParams(); // Récupère l'ID depuis l'URL
  const [quantity, setQuantity] = useState(1);
  
  // Plus tard, on récupérera cette fonction via le contexte
  // const { onAddToCart } = useContext(CartContext); 
  const onAddToCart = (item, qty) => console.log(`Ajout de ${qty} x ${item.name}`);

  const dish = mockDishes.find(d => d.id === parseInt(dishId));

  if (!dish) {
    return <h2>Plat non trouvé !</h2>;
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(dish, quantity);
    }
  };

  const otherDishes = mockDishes.filter(d => d.id !== dish.id).slice(0, 3); // Affiche 3 autres plats

  return (
    <div className={styles.page}>
      {/* --- SECTION PRINCIPALE --- */}
      <section className={styles.detailsSection}>
        <div className={styles.imageContainer}>
          <img src={dish.imageUrl} alt={dish.name} />
        </div>
        <div className={styles.infoContainer}>
          <h1>{dish.name}</h1>
          <Link to={`/snack/1`} className={styles.snackLink}>par {mockSnackData.name}</Link>
          <p className={styles.description}>{dish.description}</p>
          <span className={styles.price}>{dish.price.toFixed(2)} MAD</span>
          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><FiMinus /></button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity(q => q + 1)}><FiPlus /></button>
            </div>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>
              Ajouter au panier
            </button>
            <button className={styles.favoriteButton}><FiHeart /></button>
          </div>
        </div>
      </section>
      
      {/* --- SECTION AUTRES PLATS --- */}
      <section className={styles.relatedSection}>
        <h2>Autres Plats :</h2>
        <div className={styles.relatedGrid}>
          {otherDishes.map(otherDish => (
            <DishCard key={otherDish.id} dish={otherDish} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default DishPage;