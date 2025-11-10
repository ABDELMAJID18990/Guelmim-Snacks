// src/pages/SnacksPage/SnacksPage.jsx

import React from 'react';
import styles from './SnacksPage.module.css';

// 1. Importez les données factices centralisées
import { mockSnacks } from '../../data/mockData';

// 2. Importez le composant que nous allons réutiliser
import SnackCard from '../../components/specific/SnackCard/SnackCard';

function SnacksPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Découvrez nos restaurants partenaires</h1>
        <p>Tous les meilleurs snacks de Guelmim, réunis au même endroit.</p>
        {/* Plus tard, on pourra ajouter une barre de recherche ici ! */}
      </header>
      
      {/* 3. C'est ici que la magie opère : on affiche la grille des snacks */}
      <main className={styles.grid}>
        {mockSnacks.map(snack => (
          <SnackCard 
            key={snack.id} // La "key" est essentielle pour React lors du mapping
            snack={snack}   // On passe toutes les données du snack au composant enfant
          />
        ))}
      </main>
    </div>
  );
}

export default SnacksPage;