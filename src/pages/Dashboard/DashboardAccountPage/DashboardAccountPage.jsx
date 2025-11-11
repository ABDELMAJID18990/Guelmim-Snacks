import React, { useState, useEffect } from 'react';
import styles from './DashboardAccountPage.module.css';

import ProfileSection from './ProfileSection';
import RestaurantSection from './RestaurantSection';
import HoursAddressSection from './HoursAddressSection';

import { mockSnackData } from '../../../data/mockData';

function DashboardAccountPage() {
    const [activeTab, setActiveTab] = useState('profil');

    const [userData, setUserData] = useState({
    name: 'Fatima Alami (Gérante)',
    email: '[email protected]',
  });

  const handleSave = () => {
    console.log("Données Utilisateur à sauvegarder :", userData);
    console.log("Données Restaurant à sauvegarder :", restaurantData);
    alert("Informations sauvegardées avec succès ! (Simulation)");
  };

  const [restaurantData, setRestaurantData] = useState({
    name: mockSnackData.name,
    description: mockSnackData.description,
    address: mockSnackData.address,
    logoUrl: "logo-actuel.png",
    horaires: { Lundi: { ouvert: true, ouverture: "11:00", fermeture: "23:00" } }
  });

    const renderContent = () => {
    switch (activeTab) {
      case 'profil':
        return <ProfileSection userData={userData} setUserData={setUserData}  />;
      case 'restaurant':
        return <RestaurantSection restaurantData={restaurantData} setRestaurantData={setRestaurantData}  />;
      case 'horaires':
        return <HoursAddressSection restaurantData={restaurantData} setRestaurantData={setRestaurantData} />;
      default:
        return <ProfileSection userData={userData} setUserData={setUserData} />;
    }
  };


    return ( 
        <div className={styles.page}>
      <h1>Mon Compte</h1>
      <button onClick={handleSave} className={styles.saveButton}>Sauvegarder les modifications</button>
      <p className={styles.subtitle}>Gérez vos informations personnelles et celles de votre restaurant.</p>
        {/* Barre de Navigation (Onglets) */}
      <nav className={styles.tabs}>
        <button 
          className={activeTab === 'profil' ? styles.activeTab : ''}
          onClick={() => setActiveTab('profil')}
        >
          Mon Profil
        </button>
        <button 
          className={activeTab === 'restaurant' ? styles.activeTab : ''}
          onClick={() => setActiveTab('restaurant')}
        >
          Mon Restaurant
        </button>
        <button 
          className={activeTab === 'horaires' ? styles.activeTab : ''}
          onClick={() => setActiveTab('horaires')}
        >
          Adresse & Horaires
        </button>
      </nav>

      {/* Contenu de l'Onglet Actif */}
      <div className={styles.tabContent}>
        {renderContent()}
      </div>
    </div>
  
     );
}

export default DashboardAccountPage;