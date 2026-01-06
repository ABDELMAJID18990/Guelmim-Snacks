import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DishPage.module.css";
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import DishCard from "../../components/specific/DishCard/DishCard";

// 1. Import des actions Redux
import { addItem } from "../../store/cartSlice";
import { fetchMenu } from "../../store/productsSlice";

function DishPage() {
  const { dishId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { menu, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (menu.length === 0 && status === "idle") {
      dispatch(fetchMenu());
    }
  }, [dispatch, menu.length, status]);

  const dish = menu.find((d) => d.id === parseInt(dishId));

  if (status === "loading") {
    return (
      <p style={{ textAlign: "center", padding: "50px" }}>
        Chargement du plat...
      </p>
    );
  }

  if (!dish) {
    return (
      <h2 style={{ textAlign: "center", padding: "50px" }}>
        Plat non trouvé !
      </h2>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItem({ ...dish, quantity }));
  };
  const otherDishes = menu
    .filter((d) => d.id !== dish.id && d.category === dish.category)
    .slice(0, 3);

  return (
    <div className={styles.page}>
      {/* --- SECTION PRINCIPALE --- */}
      <section className={styles.detailsSection}>
        <div className={styles.imageContainer}>
          <img
            src={
              dish.image_url || dish.imageUrl || "https://placehold.co/400x300"
            }
            alt={dish.name}
          />
        </div>
        <div className={styles.infoContainer}>
          <h1>{dish.name}</h1>
          {dish.restaurant ? (
            <Link
              to={`/snack/${dish.restaurant.id}`}
              className={styles.snackLink}
            >
              par {dish.restaurant.name}
            </Link>
          ) : (
            <span className={styles.snackLink}>Restaurant partenaire</span>
          )}
          <p className={styles.description}>{dish.description}</p>
          <span className={styles.price}>
            {parseFloat(dish.price).toFixed(2)} MAD
          </span>
          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <FiMinus />
              </button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity((q) => q + 1)}>
                <FiPlus />
              </button>
            </div>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </button>
            <button className={styles.favoriteButton}>
              <FiHeart />
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION AUTRES PLATS --- */}
      <section className={styles.relatedSection}>
        <h2>Vous aimerez aussi :</h2>
        <div className={styles.relatedGrid}>
          {otherDishes.map((otherDish) => (
            <DishCard key={otherDish.id} dish={otherDish} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default DishPage;
