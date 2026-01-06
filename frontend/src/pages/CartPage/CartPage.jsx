import styles from "./CartPage.module.css";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { removeItem, updateQuantity } from "../../store/cartSlice.js";
import { useSelector, useDispatch } from "react-redux";

import { placeOrder } from "../../store/ordersSlice.js";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart);

  // Calcul du total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour passer commande.");
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) return;

    const restaurantId = cartItems[0].restaurant_id;

    if (!restaurantId) {
      alert("Erreur technique : Impossible d'identifier le restaurant.");
      return;
    }

    const orderData = {
      restaurant_id: restaurantId,
      total_price: subtotal,
      items: cartItems,
    };

    try {
      await dispatch(placeOrder(orderData)).unwrap();
      alert(`Merci ${user.name} ! Votre commande a été envoyée au restaurant.`);
      navigate("/");
    } catch (error) {
      console.error("Erreur commande:", error);
      alert("Une erreur est survenue lors de la commande : ");
    }
  };

  // Si le tableau des articles du panier est vide, on affiche un message spécial
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Votre panier est vide</h2>
        <p>Il est temps de le remplir avec de délicieux plats !</p>
        <Link to="/menu" className={styles.ctaButton}>
          Voir le Menu
        </Link>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <h1>Votre Panier</h1>
      <div className={styles.cartGrid}>
        {/* --- Colonne de Gauche : Liste des Articles --- */}
        <div className={styles.itemsList}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={
                  item.image_url || item.imageUrl || "https://placehold.co/100"
                }
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <span>{item.price.toFixed(2)} DH</span>
              </div>
              <div className={styles.itemQuantity}>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        newQuantity: item.quantity - 1,
                      })
                    )
                  }
                >
                  <FiMinus />
                </button>
                <input type="text" value={item.quantity} readOnly />
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        newQuantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  <FiPlus />
                </button>
              </div>
              <div className={styles.itemTotal}>
                {(item.price * item.quantity).toFixed(2)} DH
              </div>
              {/* On appelle directement la fonction reçue en props */}
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className={styles.removeItem}
              >
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
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Valider ma Commande
          </button>
        </aside>
      </div>
    </main>
  );
}

export default CartPage;
