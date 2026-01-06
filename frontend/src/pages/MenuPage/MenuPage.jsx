import React, { useState, useEffect } from 'react';
import styles from './MenuPage.module.css';

import DishCard from '../../components/specific/DishCard/DishCard';
import Badge from '../../components/ui/Badge/Badge'; // Assurez-vous que ce chemin est correct

import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from '../../store/productsSlice'; 

const categories = ["Tous", "Pizza", "Tacos", "Burgers", "Boissons"];

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const dispatch = useDispatch();
  const { menu, status } = useSelector((state) => state.products); 
  
  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const filteredDishes = activeCategory === "Tous" 
    ? menu 
    : menu.filter(dish => dish.category === activeCategory);

 
      if (status === 'loading') return <p style={{textAlign:'center', padding:'50px'}}>Chargement du menu...</p>;


  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Notre Menu Complet</h1>
        <p>Explorez tous les plats disponibles chez nos partenaires.</p>
      </header>
      
      {/* Barre de Filtres */}
      <nav className={styles.filterBar}>
        {categories.map(category => (
          <Badge 
            key={category} 
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </nav>

      {/* Grille des Plats Filtrés */}
      <main className={styles.grid}>
        {filteredDishes.map(dish => (
          <DishCard 
            key={dish.id}
            dish={dish}
            
          />
        ))}
      </main>
    </div>
  );
}

export default MenuPage;