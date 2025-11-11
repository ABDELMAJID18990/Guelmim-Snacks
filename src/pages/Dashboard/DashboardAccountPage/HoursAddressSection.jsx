import React from 'react';
import styles from './DashboardAccountPage.module.css';

const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

function HoursAddressSection({ restaurantData, setRestaurantData }){
    const handleHourChange = (jour, field, value) => {
    const newHoraires = {
      ...restaurantData.horaires,
      [jour]: {
        ...restaurantData.horaires?.[jour], // On garde les anciennes valeurs du jour
        [field]: value
      }
    };
    setRestaurantData({ ...restaurantData, horaires: newHoraires });
  };

  return (
    <div>
      <h2>Adresse & Horaires</h2>
      <div className={styles.formGroup}>
        <label htmlFor="address">Adresse du Restaurant</label>
        <input 
          id="address"
          type="text"
          value={restaurantData.address}
          onChange={(e) => setRestaurantData({ ...restaurantData, address: e.target.value })}
        />
      </div>
      
      <hr className={styles.separator} />
      <h3>Horaires d'ouverture</h3>
      {jours.map(jour => (
        <div key={jour} className={styles.dayRow}>
          <label className={styles.dayLabel}>
            <input 
              type="checkbox"
              checked={restaurantData.horaires?.[jour]?.ouvert || false}
              onChange={(e) => handleHourChange(jour, 'ouvert', e.target.checked)}
            />
            {jour}
          </label>
          {restaurantData.horaires?.[jour]?.ouvert ? (
            <div className={styles.timeInputs}>
              <input type="time" value={restaurantData.horaires?.[jour]?.ouverture || ''} onChange={(e) => handleHourChange(jour, 'ouverture', e.target.value)} />
              <span> - </span>
              <input type="time" value={restaurantData.horaires?.[jour]?.fermeture || ''} onChange={(e) => handleHourChange(jour, 'fermeture', e.target.value)} />
            </div>
          ) : (
            <span className={styles.closedText}>Fermé</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default HoursAddressSection;