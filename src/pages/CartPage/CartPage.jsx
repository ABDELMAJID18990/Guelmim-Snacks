import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';
import styles from './CartPage.module.css';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';



function CartPage({ cartItems, onQuantityChange, onRemoveItem }) {

  // Calcule le sous-total
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // (Logique factice pour les boutons - à connecter plus tard)
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Empêche la quantité de descendre en dessous de 1
    onQuantityChange(itemId, newQuantity);    // Ici, vous mettriez à jour l'état du panier
  };
  const handleRemoveItem = (itemId) => {
    onRemoveItem(itemId);    
  };

  return (
    

      <main className={styles.container}>
        <h1>Votre Panier</h1>

        <div className={styles.cartGrid}>
          {/* --- Colonne de Gauche : Liste des Articles --- */}
          <div className={styles.itemsList}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <span>{item.price.toFixed(2)} DH</span>
                </div>
                <div className={styles.itemQuantity}>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}><FiMinus /></button>
                  <input type="text" value={item.quantity} readOnly />
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}><FiPlus /></button>
                </div>
                <div className={styles.itemTotal}>
                  {(item.price * item.quantity).toFixed(2)} DH
                </div>
                <button onClick={() => handleRemoveItem(item.id)} className={styles.removeItem}>
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          {/* --- Colonne de Droite : Résumé de la Commande --- */}
          <aside className={styles.summary}>
            <h2>Résumé</h2>
            <div className={styles.summaryRow}>
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} DH</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Frais de service</span>
              <span>0.00 DH</span>
            </div>
            <hr className={styles.separator} />
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>{subtotal.toFixed(2)} DH</span>
            </div>
            <button className={styles.checkoutButton}>Valider ma Commande</button>
          </aside>
        </div>
      </main>

  );
}

export default CartPage;