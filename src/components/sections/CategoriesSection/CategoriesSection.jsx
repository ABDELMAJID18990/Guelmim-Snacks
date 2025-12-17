import React from 'react';
import CategoryCard from '../../specific/CategoryCard/CategoryCard';
import styles from './CategoriesSection.module.css';

// Données factices pour les catégories
const mockCategories = [
  { id: 1, name: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65' },
  { id: 2, name: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add' },
  { id: 3, name: 'Tacos', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQszdcSoc3xpMFRqsmtKAHaWzU4QefDgiK4RQ&s' },
  { id: 4, name: 'Salades', imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2019/07/salad.jpg' },
  { id: 5, name: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b' },
];

function CategoriesSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Explorer par Catégories</h2>
      
      <div className={styles.grid}>
        {/* On utilise .map() pour créer une CategoryCard pour chaque catégorie */}
        {mockCategories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;