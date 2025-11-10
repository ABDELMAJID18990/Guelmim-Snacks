import React from 'react';
import SnackCard from '../../specific/SnackCard/SnackCard'; // <-- Importez votre SnackCard !
import styles from './SnacksSection.module.css';

const mockSnacks = [
  {
    id: 1,
    name: 'Bistro Ali',
    category: 'Pizza au feu de bois & Tacos',
    rating: 4.8,
    priceRange: '30 - 80 DH',
    address: 'Centre Ville',
    imageUrl: 'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734'
  },
  {
    id: 2,
    name: 'Burger Queen',
    category: 'Burgers & Grillades',
    rating: 4.6,
    priceRange: '35 - 90 DH',
    address: 'Hay El Matar',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
  },
  {
    id: 3,
    name: 'Tacos de Lyon',
    category: 'Tacos Français & Poutines',
    rating: 4.7,
    priceRange: '25 - 50 DH',
    address: 'Av. El Kadi Ayad',
    imageUrl: 'https://images.unsplash.com/photo-1628198797371-38a4d4ea0a15'
  }
];

function SnacksSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Découvrez nos Meilleurs Snacks</h2>
      
      <div className={styles.grid}>
        {/* On fait une boucle sur les snacks et on affiche une carte pour chacun */}
        {mockSnacks.map(snack => (
          <SnackCard key={snack.id} snack={snack} />
        ))}
      </div>
    </section>
  );
}

export default SnacksSection;