import React, { useState } from 'react';

// Importation de tous les composants nécessaires
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';
import SnackHeader from '../../components/sections/SnackHeader/SnackHeader';
import DishCard from '../../components/specific/DishCard/DishCard';
import Badge from '../../components/ui/Badge/Badge';

import TestimonialsSection from '../../components/sections/TestimonialsSection/TestimonialsSection';
import LocationSection from '../../components/sections/LocationSection/LocationSection';

// Importation des styles
import styles from './SnackPage.module.css';

// --- Données Factices Remplies ---
const mockSnackData = {
  name: 'Bistro Ali',
  description: "Bienvenue chez Bistro Ali, là où la tradition gourmande rencontre la passion familiale. Depuis plus de vingt ans, notre cuisine est le cœur battant de Guelmim. Chaque plat est préparé avec des ingrédients frais et l'amour du goût authentique.",
  address: "192 Bd Moulay Rachid, Guelmim 81000",
  phone: "07-00-11-22-33",
  logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4SxdR6cjW45b6kd8m5-MLvgCzitQHXSjGA&s', // URL d'un logo sympa pour l'exemple
  socials: {
    instagram: '#',
    facebook: '#',
    tiktok: '#'
  }
};

const mockDishes = [
  { id: 1, name: "Pizza Regina", description: "La classique : sauce tomate, mozzarella, jambon, et champignons frais.", price: 50.00, prepTime: "20 min", imageUrl: "https://images.unsplash.com/photo-1594007654729-407eedc4be65" },
  { id: 2, name: "Tacos Poulet Gratiné", description: "Poulet mariné, frites maison, sauce fromagère onctueuse, le tout gratiné au four.", price: 35.00, prepTime: "15 min", imageUrl: "https://images.unsplash.com/photo-1562086181-4494c643194a" },
  { id: 3, name: "Burger 'Sahara'", description: "Double steak, cheddar, bacon de dinde, oignons frits et sauce barbecue fumée.", price: 45.00, prepTime: "15 min", imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add" },
  { id: 4, name: "Pizza Végétarienne", description: "Légumes de saison grillés, sauce tomate, mozzarella, olives noires.", price: 45.00, prepTime: "20 min", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
  { id: 5, name: "Mojito Fraise (sans alcool)", description: "Boisson pétillante et rafraîchissante à la fraise et à la menthe.", price: 20.00, prepTime: "5 min", imageUrl: "https://images.unsplash.com/photo-1543364195-bfe6e49323d7" }
];

const categories = ["Tous", "Pizza", "Tacos", "Burgers", "Boissons"];

function SnackPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  return (
    <div className={styles.page}>
      <Navbar />

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
              {mockDishes.map(dish => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        </section>
        <TestimonialsSection />
        <LocationSection snackData={mockSnackData} />
      </main>

      <Footer />
    </div>
  );
}

export default SnackPage;