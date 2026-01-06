import styles from "./SnacksPage.module.css";
import SnackCard from "../../components/specific/SnackCard/SnackCard";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchSnacks } from "../../store/productsSlice";

function SnacksPage() {
  const dispatch = useDispatch();

  const { snacks, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchSnacks());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className={styles.centerMsg}>
        <h2>Chargement des snacks...</h2>
      </div>
    );
  }

  if (status == "failed") {
    return (
      <div className={styles.centerMsg}>
        <h2 style={{ color: "red" }}>Erreur : {error}</h2>
        <p>Vérifiez que "php artisan serve" est bien lancé.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Découvrez nos restaurants partenaires</h1>
        <p>Tous les meilleurs snacks de Guelmim, réunis au même endroit.</p>
      </header>

      <main className={styles.grid}>
        {/* Ajout d'une gestion si la liste est vide */}
        {snacks.length > 0 ? (
          snacks.map((snack) => <SnackCard key={snack.id} snack={snack} />)
        ) : (
          <p>Aucun restaurant disponible pour le moment.</p>
        )}
      </main>
    </div>
  );
}

export default SnacksPage;
