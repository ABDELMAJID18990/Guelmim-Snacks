import React from "react";
import styles from "./RestaurantSetupPage.module.css";
import { FiUpload, FiImage } from "react-icons/fi";

function Step2_Visuals({ data, update }) {
  const handleFileChange = (e, fieldName, previewName) => {
    const file = e.target.files[0];
    if (file) {
      update({
        [fieldName]: file,
        [previewName]: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className={styles.stepContent}>
      <h2>Donnez une identité à votre restaurant</h2>
      <div className={styles.sigleUploader}>
        <div className={styles.formGroup}>
          <label>Votre Logo</label>
          <label htmlFor="logo-upload" className={styles.uploadBox}>
            {data.logoPreview ? (
              <img
                src={data.logoPreview}
                alt="Aperçu du logo"
                className={styles.previewImage}
              />
            ) : (
              <span>
                <FiUpload size={24} /> Choisir le logo
              </span>
            )}
          </label>
          <input
            id="logo-upload"
            type="file"
            onChange={(e) => handleFileChange(e, "logo", "logoPreview")}
          />
        </div>
        {/* 2. L'IMAGE DE COUVERTURE */}
        <div className={styles.formGroup}>
          <label>Image de Couverture (Bannière)</label>
          <label htmlFor="cover-upload" className={styles.uploadBox}>
            {data.coverPreview ? (
              <img
                src={data.coverPreview}
                alt="Aperçu couverture"
                className={styles.previewImage}
              />
            ) : (
              <span>
                <FiImage size={24} /> Choisir la bannière
              </span>
            )}
          </label>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "coverImage", "coverPreview")}
          />
        </div>
      </div>
    </div>
  );
}
export default Step2_Visuals;
