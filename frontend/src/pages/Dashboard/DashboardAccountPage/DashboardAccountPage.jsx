import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DashboardAccountPage.module.css";

import {
  fetchMyRestaurant,
  updateRestaurantSettings,
} from "../../../store/productsSlice";

import ProfileSection from "./ProfileSection";
import RestaurantSection from "./RestaurantSection";
import HoursAddressSection from "./HoursAddressSection";

function DashboardAccountPage() {
  const [activeTab, setActiveTab] = useState("profil");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { myRestaurant } = useSelector((state) => state.products);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const defaultHoraires = {
    Lundi: { ouvert: false },
    Mardi: { ouvert: false },
    Mercredi: { ouvert: false },
    Jeudi: { ouvert: false },
    Vendredi: { ouvert: false },
    Samedi: { ouvert: false },
    Dimanche: { ouvert: false },
  };

  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    address: "",
    logoUrl: "",
    horaires: defaultHoraires,
  });

  useEffect(() => {
    dispatch(fetchMyRestaurant());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserData({ name: user.name, email: user.email });
    }

    if (myRestaurant) {
      let loadedHoraires = null;

      if (myRestaurant.horaires) {
        if (myRestaurant.horaires) {
          let rawData = myRestaurant.horaires;

          try {
            // Cas 1 : Laravel a déjà converti en Objet (grâce au 'cast')
            if (typeof rawData === "object") {
              loadedHoraires = rawData;
              // Cas 2 : C'est une chaîne JSON (String)
            } else if (typeof rawData === "string") {
              loadedHoraires = JSON.parse(loadedHoraires);

              // Cas 3 (Sécurité) : Double encodage JSON
              if (typeof loadedHoraires === "string") {
                loadedHoraires = JSON.parse(loadedHoraires);
              }
            }
          } catch (e) {
            console.error("Erreur parsing horaires", e);
          }
        }

        const finalHoraires = loadedHoraires 
        ? { ...defaultHoraires, ...loadedHoraires } 
        : defaultHoraires;

        setRestaurantData({
          name: myRestaurant.name || "",
          description: myRestaurant.description || "",
          address: myRestaurant.address || "",
          logoUrl: myRestaurant.logo_url || "",
          horaires: finalHoraires,
        });
      }
    }
  }, [user, myRestaurant]);

  const handleSave = async () => {
    if (activeTab === "restaurant" || activeTab === "horaires") {
      const formData = new FormData();

      formData.append("name", restaurantData.name);
      formData.append("description", restaurantData.description);
      formData.append("address", restaurantData.address);

      formData.append("horaires", JSON.stringify(restaurantData.horaires));

      if (restaurantData.logoFile instanceof File) {
        formData.append("logo", restaurantData.logoFile);
      }

      try {
        await dispatch(updateRestaurantSettings(formData)).unwrap();
        alert("Modifications du restaurant enregistrées !");
        dispatch(fetchMyRestaurant());
      } catch (error) {
        alert("Erreur : " + error);
      }
    } else {
      alert(
        "La modification du profil utilisateur n'est pas encore connectée à l'API."
      );
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profil":
        return <ProfileSection userData={userData} setUserData={setUserData} />;
      case "restaurant":
        return (
          <RestaurantSection
            restaurantData={restaurantData}
            setRestaurantData={setRestaurantData}
          />
        );
      case "horaires":
        return (
          <HoursAddressSection
            restaurantData={restaurantData}
            setRestaurantData={setRestaurantData}
          />
        );
      default:
        return <ProfileSection userData={userData} setUserData={setUserData} />;
    }
  };

  return (
    <div className={styles.page}>
      <h1>Mon Compte</h1>
      <button onClick={handleSave} className={styles.saveButton}>
        Sauvegarder les modifications
      </button>
      <p className={styles.subtitle}>
        Gérez vos informations personnelles et celles de votre restaurant.
      </p>
      {/* Barre de Navigation (Onglets) */}
      <nav className={styles.tabs}>
        <button
          className={activeTab === "profil" ? styles.activeTab : ""}
          onClick={() => setActiveTab("profil")}
        >
          Mon Profil
        </button>
        <button
          className={activeTab === "restaurant" ? styles.activeTab : ""}
          onClick={() => setActiveTab("restaurant")}
        >
          Mon Restaurant
        </button>
        <button
          className={activeTab === "horaires" ? styles.activeTab : ""}
          onClick={() => setActiveTab("horaires")}
        >
          Adresse & Horaires
        </button>
      </nav>

      {/* Contenu de l'Onglet Actif */}
      <div className={styles.tabContent}>{renderContent()}</div>
      {/* </div> */}
    </div>
  );
}

export default DashboardAccountPage;
