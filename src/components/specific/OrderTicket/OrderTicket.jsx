import React from 'react';
import styles from './OrderTicket.module.css';

function OrderTicket({ order, onAccept, onReady, onCollect, onDecline }) {
  // Valeurs par défaut pour éviter les erreurs
  const { 
    id = '#0000', 
    customerName = 'Client Anonyme', 
    time = 'N/A', 
    items = [],
    status = 'new'
  } = order;

  return (
    <div className={styles.ticket}>
      {/* --- En-tête --- */}
      <div className={styles.header}>
        <span className={styles.orderId}>Commande {id}</span>
        <span className={styles.time}>{time}</span>
      </div>

      {/* --- Client --- */}
      <h3 className={styles.customerName}>{customerName}</h3>

      <hr className={styles.separator} />

      {/* --- Liste des Plats --- */}
      <ul className={styles.itemList}>
        {items.map(item => (
          <li key={item.name}>
            <span className={styles.quantity}>{item.quantity}x</span>
            <span className={styles.itemName}>{item.name}</span>
            {item.instructions && <p className={styles.instructions}>"{item.instructions}"</p>}
          </li>
        ))}
      </ul>
      
      {/* --- Boutons d'Action (changent en fonction du statut) --- */}
      <div className={styles.actions}>
        {status === 'new' && (
          <>
            <button className={`${styles.button} ${styles.decline}`} onClick={() => onDecline(id)}>Refuser</button>
            <button className={`${styles.button} ${styles.accept}`} onClick={() => onAccept(id)}>Accepter</button>
          </>
        )}
        {status === 'preparing' && (
          <button className={`${styles.button} ${styles.ready}`}  onClick={() => onReady(id)}>Commande Prête</button>
        )}
        {status === 'ready' && (
          <button className={`${styles.button} ${styles.collected}`} onClick={() => onCollect(id)}>Récupérée</button>
        )}
      </div>
    </div>
  );
}

export default OrderTicket;