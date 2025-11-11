import React from 'react';
import styles from './DashboardAccountPage.module.css';

function ProfileSection({ userData, setUserData }) {
  
  // Note : la modification du mot de passe se fait généralement dans une modale dédiée
  const handleChangePassword = () => {
    alert("Fonctionnalité de changement de mot de passe à implémenter.");
  };

  return (
    <div>
      <h2>Mon Profil</h2>
      <div className={styles.formGroup}>
        <label htmlFor="fullName">Nom Complet</label>
        <input 
          id="fullName"
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Adresse E-mail</label>
        <input 
          id="email"
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>

      <hr className={styles.separator} />
      
      <h3>Sécurité</h3>
      <button onClick={handleChangePassword} className={styles.secondaryButton}>
        Changer le mot de passe
      </button>
    </div>
  );
}

export default ProfileSection;