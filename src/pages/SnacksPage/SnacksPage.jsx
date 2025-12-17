import React, { useState, useEffect } from "react";
import styles from "./SnacksPage.module.css";
import SnackCard from "../../components/specific/SnackCard/SnackCard";
import  axios  from "axios";

function SnacksPage() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/snacks")
      .then((response) => {

        console.log("Données reçues de Laravel:", response.data.logo_url);
        setSnacks(response.data);
        setLoading(false);

      })
      .catch((error) => console.error("Erreur API:", error));
  }, []);

    if (loading) return <p>Chargement des snacks...</p>;


  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Découvrez nos restaurants partenaires</h1>
        <p>Tous les meilleurs snacks de Guelmim, réunis au même endroit.</p>
      </header>

      <main className={styles.grid}>
        {snacks.map((snack) => (
          <SnackCard key={snack.id} snack={snack} />
        ))}
      </main>
    </div>
  );
}

export default SnacksPage;
