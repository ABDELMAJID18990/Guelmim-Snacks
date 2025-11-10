import styles from './CartPage.module.css';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import de Link pour le panier vide

import { removeItem, updateQuantity } from '../../store/cartActions';
import { useSelector, useDispatch } from 'react-redux';

function CartPage() {

  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // Si le tableau des articles du panier est vide, on affiche un message spécial
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Votre panier est vide</h2>
        <p>Il est temps de le remplir avec de délicieux plats !</p>
        <Link to="/menu" className={styles.ctaButton}>Voir le Menu</Link>
      </div>
    );
  }

  // Si le panier n'est pas vide, on continue l'affichage normal
  // Calcule le sous-total à la volée
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
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
                <button onClick={() => dispatch(updateQuantity({ id: item.id, newQuantity: item.quantity - 1 }))}><FiMinus /></button>
                <input type="text" value={item.quantity} readOnly />
                <button onClick={() => dispatch(updateQuantity(item.id, item.quantity + 1))}><FiPlus /></button>
              </div>
              <div className={styles.itemTotal}>
                {(item.price * item.quantity).toFixed(2)} DH
              </div>
              {/* On appelle directement la fonction reçue en props */}
              <button onClick={() => dispatch(removeItem(item.id))} className={styles.removeItem}>
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