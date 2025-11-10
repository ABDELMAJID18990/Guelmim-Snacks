import HeroSection from '../../components/sections/HeroSection/HeroSection';
import CategoriesSection from '../../components/sections/CategoriesSection/CategoriesSection';
import SnacksSection from '../../components/sections/SnacksSection/SnacksSection';
import HowItWorksSection from '../../components/sections/HowItWorksSection/HowItWorksSection';
import BecomePartnerSection from '../../components/sections/BecomePartnerSection/BecomePartnerSection';


// Importation du style spécifique à la page
import styles from './HomePage.module.css';
import CartPage from '../CartPage/CartPage';

function HomePage() {
  return (
    <div className={styles.homePageContainer}>
    

    
      <main>
        <HeroSection /> 
        <HowItWorksSection /> 
        <SnacksSection />
        <CategoriesSection />
        <BecomePartnerSection />
      </main>

      
    </div>
  );
}

export default HomePage;