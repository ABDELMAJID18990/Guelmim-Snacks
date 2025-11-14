import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { mockSnackData, mockDishes } from '../../data/mockData';

import SnackHeader from '../../components/sections/SnackHeader/SnackHeader';
import DishCard from '../../components/specific/DishCard/DishCard';
import Badge from '../../components/ui/Badge/Badge';
import TestimonialsSection from '../../components/sections/TestimonialsSection/TestimonialsSection';
import LocationSection from '../../components/sections/LocationSection/LocationSection';

// Importation des styles
import styles from './SnackPage.module.css';



const categories = ["Tous", "Pizza", "Tacos", "Burgers", "Boissons"];

function SnackPage({ onAddToCart }) {
  const { snackId } = useParams();
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredDishes = activeCategory === "Tous" 
      ? mockDishes // Si "Tous" est sélectionné, on montre tout
      : mockDishes.filter(dish => dish.category === activeCategory);

  return (
      <main>
        {/* L'en-tête du Snack, rempli avec les données */}
        <SnackHeader snack={mockSnackData} />

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
              {filteredDishes.map(dish => (
                <DishCard key={dish.id} dish={dish} onAddToCart={onAddToCart}  />
              ))}
            </div>
          </div>
        </section>
        <TestimonialsSection />
        <LocationSection snackData={mockSnackData} />
      </main>

  );
}

export default SnackPage;