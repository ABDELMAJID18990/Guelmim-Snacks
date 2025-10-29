import React from 'react';
import CategoryCard from '../../specific/CategoryCard/CategoryCard';
import styles from './CategoriesSection.module.css';

// Données factices pour les catégories
const mockCategories = [
  { id: 1, name: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65' },
  { id: 2, name: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add' },
  { id: 3, name: 'Tacos', imageUrl: 'https://images.unsplash.com/photo-1562086181-4494c643194a' },
  { id: 4, name: 'Salades', imageUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dbaa1' },
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