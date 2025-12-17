import SnackCard from '../../specific/SnackCard/SnackCard'; 
import styles from './SnacksSection.module.css';
import {mockSnacks}from '../../../data/mockData';


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