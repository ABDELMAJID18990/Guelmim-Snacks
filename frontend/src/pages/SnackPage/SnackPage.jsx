import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSnackDetails } from '../../store/productsSlice';

import SnackHeader from '../../components/sections/SnackHeader/SnackHeader';
import DishCard from '../../components/specific/DishCard/DishCard';
import Badge from '../../components/ui/Badge/Badge';
import TestimonialsSection from '../../components/sections/TestimonialsSection/TestimonialsSection';
import LocationSection from '../../components/sections/LocationSection/LocationSection';

import styles from './SnackPage.module.css';



const categories = ["Tous", "Pizza", "Tacos", "Burgers", "Boissons"];

function SnackPage({ onAddToCart }) {
  const { snackId } = useParams();
  const [activeCategory, setActiveCategory] = useState("Tous");
  const dispatch = useDispatch();
  const { currentSnack, status } = useSelector((state) => state.products);

  useEffect(() => {

    if (snackId) {
      dispatch(fetchSnackDetails(snackId));

    }

  }, [dispatch, snackId]);




  if (status === 'loading' || !currentSnack) {
    return <p style={{textAlign:'center', padding:'50px'}}>Chargement du restaurant...</p>;
  }

    const dishes = currentSnack.dishes || [];

    
  const filteredDishes = activeCategory === "Tous" 
      ? dishes 
      : dishes.filter(dish => dish.category === activeCategory);


  return (
      <main>
        {/* L'en-tête du Snack, rempli avec les données */}
        <SnackHeader snack={currentSnack} />

        {/* La section Menu */}
        <section className={styles.menuSection}>
          <div className={styles.menuContainer}>
            <h2 className={styles.menuTitle}>Notre Menu</h2>
            
            <div className={styles.filterBar}>
              {categories.map(category => (
                <Badge 
                  key={category} 
                  isActive={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className={styles.dishesGrid}>
              {filteredDishes.length > 0 ? (
                filteredDishes.map(dish => (
                  <DishCard 
                    key={dish.id} 
                    dish={dish} 
                  />
                ))
              ) : (
                <p style={{textAlign: 'center', gridColumn: '1/-1'}}>
                  Aucun plat trouvé dans cette catégorie.
                </p>
              )}
            </div>
          </div>
        </section>
        <TestimonialsSection />
        <LocationSection snackData={currentSnack} />
      </main>

  );
}

export default SnackPage;