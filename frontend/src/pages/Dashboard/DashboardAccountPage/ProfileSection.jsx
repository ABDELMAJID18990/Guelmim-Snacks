import React, { useState } from "react";
import styles from "./DashboardAccountPage.module.css";
import PasswordModal from "./PasswordModal"; //

function ProfileSection({ userData, setUserData }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

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
      <div className={styles.securityBox}>
        <p className={styles.securityNotice}>
          Pour des raisons de sécurité, nous vous demanderons votre mot de passe
          actuel.
        </p>
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className={styles.secondaryButton}
        >
          Changer le mot de passe
        </button>
      </div>

      {/* AJOUT DE LA MODALE */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}

export default ProfileSection;
