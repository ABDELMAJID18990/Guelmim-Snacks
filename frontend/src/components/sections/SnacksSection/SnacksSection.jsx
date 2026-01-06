import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSnacks } from "../../../store/productsSlice";

import SnackCard from "../../specific/SnackCard/SnackCard";
import styles from "./SnacksSection.module.css";

function SnacksSection() {
  const dispatch = useDispatch();

  const { snacks, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSnacks());
    }
  }, [status, dispatch]);

  const topSnacks = snacks.slice(0, 3);

  if (status === "failed") {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Découvrez nos Meilleurs Snacks</h2>

      {status === "loading" ? (
        <p style={{ textAlign: "center" }}>Recherche des meilleurs snacks...</p>
      ) : (
        <div className={styles.grid}>
          {topSnacks.length > 0 ? (
            topSnacks.map((snack) => <SnackCard key={snack.id} snack={snack} />)
          ) : (
            <p>Aucun snack partenaire pour le moment.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default SnacksSection;
