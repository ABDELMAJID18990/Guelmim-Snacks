import React from 'react';
import styles from './DashboardOrdersPage.module.css';

import DashboardSidebar from '../../../components/layout/DashboardSidebar/DashboardSidebar'; 
import OrderTicket from '../../../components/specific/OrderTicket/OrderTicket';


const mockOrders = [

  { 
    id: '#1024', 
    customerName: 'Ali Alaoui', 
    time: '19:32', 
    status: 'new', 
    items: [
      { quantity: 2, name: 'Tacos Poulet', instructions: 'Sans oignons, sauce algérienne' },
      { quantity: 1, name: 'Fanta Orange' },
    ] 
  },
  { 
    id: '#1025', 
    customerName: 'Khadija M.', 
    time: '19:34', 
    status: 'new', 
    items: [
      { quantity: 1, name: 'Pizza Margherita' },
    ] 
  },
  
  // Colonne "En Préparation"
  { 
    id: '#1023', 
    customerName: 'Fatima Z.', 
    time: '19:28', 
    status: 'preparing', 
    items: [
      { quantity: 1, name: 'Pizza Regina' },
      { quantity: 1, name: 'Salade César' },
    ] 
  },
  { 
    id: '#1021', 
    customerName: 'Amina S.', 
    time: '19:25', 
    status: 'preparing', 
    items: [
      { quantity: 1, name: 'Pizza 4 Fromages' },
    ] 
  },

  // Colonne "Prêtes"
  { 
    id: '#1022', 
    customerName: 'Youssef K.', 
    time: '19:15', 
    status: 'ready', 
    items: [
      { quantity: 1, name: 'Burger \'Sahara\'' },
      { quantity: 1, name: 'Coca-Cola' },
    ] 
  },
];


// --- Le Composant Principal de la Page ---
function DashboardOrdersPage() {
  // On utilise la méthode .filter() pour trier les commandes dans les bonnes colonnes
  const newOrders = mockOrders.filter(order => order.status === 'new');
  const preparingOrders = mockOrders.filter(order => order.status === 'preparing');
  const readyOrders = mockOrders.filter(order => order.status === 'ready');

  return (
    // Le conteneur de la page, géré par Flexbox dans le CSS
    <div className={styles.page}>
    
      {/* --- Première Partie : La Barre Latérale --- */}
      <DashboardSidebar />
      
      {/* --- Deuxième Partie : Le Contenu Principal --- */}
      <main className={styles.mainContent}>
        <h1>Tableau des Commandes</h1>
        <p className={styles.subtitle}>Gérez les nouvelles commandes et suivez leur progression en temps réel.</p>
        
        <div className={styles.kanbanBoard}>
          
          {/* --- Colonne 1 : Nouvelles Commandes --- */}
          <div className={styles.kanbanColumn}>
            <div className={styles.columnHeader}>
              <span className={`${styles.statusDot} ${styles.new}`}></span>
              <h2>Nouvelles ({newOrders.length})</h2>
            </div>
            <div className={styles.columnContent}>
              {newOrders.map(order => (
                <OrderTicket key={order.id} order={order} />
              ))}
            </div>
          </div>
          
          {/* --- Colonne 2 : En Préparation --- */}
          <div className={styles.kanbanColumn}>
            <div className={styles.columnHeader}>
              <span className={`${styles.statusDot} ${styles.preparing}`}></span>
              <h2>En Préparation ({preparingOrders.length})</h2>
            </div>
            <div className={styles.columnContent}>
              {preparingOrders.map(order => (
                <OrderTicket key={order.id} order={order} />
              ))}
            </div>
          </div>

          {/* --- Colonne 3 : Prêtes --- */}
          <div className={styles.kanbanColumn}>
            <div className={styles.columnHeader}>
              <span className={`${styles.statusDot} ${styles.ready}`}></span>
              <h2>Prêtes ({readyOrders.length})</h2>
            </div>
            <div className={styles.columnContent}>
              {readyOrders.map(order => (
                <OrderTicket key={order.id} order={order} />
              ))}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default DashboardOrdersPage;