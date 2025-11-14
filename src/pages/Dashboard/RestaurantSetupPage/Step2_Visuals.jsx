import React from 'react';
import styles from './RestaurantSetupPage.module.css';
import { FiUpload } from 'react-icons/fi';

function Step2_Visuals({ data, update }) {
  const handleFileChange = (e, fieldName, previewName) => {
    const file = e.target.files[0];
    if (file) {
      update({
        [fieldName]: file,
        [previewName]: URL.createObjectURL(file)
      });
    }
  };

  return (
    <div className={styles.stepContent}>
      <h2>Ajoutez vos visuels</h2>
      <div className={styles.sigleUploader}>
        <div className={styles.formGroup}>
          <label>Votre Logo</label>
          <label htmlFor="logo-upload" className={styles.uploadBox}>
            {data.logoPreview ? (
              <img src={data.logoPreview} alt="Aperçu du logo" className={styles.previewImage} />
            ) : (
              <span><FiUpload /> Choisir un fichier</span>
            )}
          </label>
          <input id="logo-upload" type="file" onChange={(e) => handleFileChange(e, 'logo', 'logoPreview')} />
        </div>
      </div>
    </div>
  );
}
export default Step2_Visuals;