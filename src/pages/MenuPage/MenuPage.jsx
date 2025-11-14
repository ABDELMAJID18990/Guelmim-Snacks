import React, { useState } from 'react';
import styles from './MenuPage.module.css';

import { mockDishes } from '../../data/mockData';

import DishCard from '../../components/specific/DishCard/DishCard';
import Badge from '../../components/ui/Badge/Badge'; // Assurez-vous que ce chemin est correct


const categories = ["Tous", "Pizza", "Tacos", "Burgers", "Boissons"];

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  
  // Fonction pour ajouter au panier (juste un log pour l'instant)
  const onAddToCart = (dish) => {
    console.log(`Ajout de ${dish.name} au panier depuis la page Menu.`);
  }

  // On filtre les plats à afficher en fonction de la catégorie active
  const filteredDishes = activeCategory === "Tous" 
    ? mockDishes // Si "Tous" est sélectionné, on montre tout
    : mockDishes.filter(dish => dish.category === activeCategory);

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
            onAddToCart={onAddToCart} // On passe la fonction au composant enfant
          />
        ))}
      </main>
    </div>
  );
}

export default MenuPage;