import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';
import styles from './CartPage.module.css';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

// --- Données Factices pour le Panier (ce qui viendrait de l'état global) ---
const initialCartItems = [
  { id: 2, name: "Tacos Poulet Spécial", price: 35.00, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1562086181-4494c643194a" },
  { id: 5, name: "Pizza 4 Fromages", price: 55.00, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1628834692784-766432b50935" },
];

function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Calcule le sous-total
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // (Logique factice pour les boutons - à connecter plus tard)
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Empêche la quantité de descendre en dessous de 1
    console.log(`Changer la quantité pour l'article ${itemId} à ${newQuantity}`);
    // Ici, vous mettriez à jour l'état du panier
  };
  const handleRemoveItem = (itemId) => {
    console.log(`Supprimer l'article ${itemId}`);
    // Ici, vous filtreriez le tableau cartItems pour supprimer l'article
  };

  return (
    <div className={styles.page}>
      <Navbar />

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

      <Footer />
    </div>
  );
}

export default CartPage;