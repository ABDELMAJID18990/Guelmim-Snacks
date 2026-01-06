import React from 'react';
import styles from './RestaurantSetupPage.module.css';

const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

function Step3_Horaires({ data, update }) {
  // Cette fonction de mise à jour est plus complexe car les horaires sont un objet imbriqué
  const handleHourChange = (jour, field, value) => {
    const newHoraires = {
      ...data.horaires,
      [jour]: {
        ...data.horaires[jour],
        [field]: value
      }
    };
    update({ horaires: newHoraires });
  };
  
  return (
    <div className={styles.stepContent}>
      <h2>Quels sont vos horaires d'ouverture ?</h2>
      {jours.map(jour => (
        <div key={jour} className={styles.dayRow}>
          <label className={styles.dayLabel}>
            <input 
              type="checkbox"
              checked={data.horaires[jour]?.ouvert || false}
              onChange={(e) => handleHourChange(jour, 'ouvert', e.target.checked)}
            />
            {jour}
          </label>
          {data.horaires[jour]?.ouvert ? (
            <div className={styles.timeInputs}>
              <input type="time" onChange={(e) => handleHourChange(jour, 'ouverture', e.target.value)} />
              <span> - </span>
              <input type="time" onChange={(e) => handleHourChange(jour, 'fermeture', e.target.value)} />
            </div>
          ) : (
            <span className={styles.closedText}>Fermé</span>
          )}
        </div>
      ))}
    </div>
  );
}
export default Step3_Horaires;