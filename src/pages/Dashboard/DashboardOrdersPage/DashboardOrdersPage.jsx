import React from 'react';
import styles from './DashboardOrdersPage.module.css';


import OrderTicket from '../../../components/specific/OrderTicket/OrderTicket';





// --- Le Composant Principal de la Page ---
function DashboardOrdersPage({ orders, handleAcceptOrder, handleReadyOrder, handleCollectOrder, handleDeclineOrder  }) {
  // On utilise la méthode .filter() pour trier les commandes dans les bonnes colonnes
  const newOrders = orders.filter(order => order.status === 'new');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');

  return (
  
    <>
    
    
      
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
                <OrderTicket
                 key={order.id}
                  order={order} 
                  onAccept={handleAcceptOrder}
                  onDecline={handleDeclineOrder} />
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
                <OrderTicket 
                key={order.id} 
                order={order}
                onReady={handleReadyOrder} />
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
                <OrderTicket 
                key={order.id} 
                order={order}
                onCollect={handleCollectOrder} />
              ))}
            </div>
          </div>
          
        </div>
      </main>
    </>
  );
}

export default DashboardOrdersPage;