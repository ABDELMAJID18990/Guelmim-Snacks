import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import CategoriesSection from '../../components/sections/CategoriesSection/CategoriesSection';
import SnacksSection from '../../components/sections/SnacksSection/SnacksSection';
import HowItWorksSection from '../../components/sections/HowItWorksSection/HowItWorksSection';
import BecomePartnerSection from '../../components/sections/BecomePartnerSection/BecomePartnerSection';
import Footer from '../../components/layout/Footer/Footer';

// Importation du style spécifique à la page
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.homePageContainer}>
    
      {/* --- En-tête de la Page --- */}
      <Navbar />

    
      <main>
        <HeroSection /> 
        <HowItWorksSection /> 
        <CategoriesSection />
        <SnacksSection />
        <BecomePartnerSection />
      </main>

      
      <Footer />
      
    </div>
  );
}

export default HomePage;