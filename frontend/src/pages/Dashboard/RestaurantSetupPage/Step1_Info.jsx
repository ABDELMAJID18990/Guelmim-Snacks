import React from "react";
import styles from "./RestaurantSetupPage.module.css";

function Step1_Info({ data, update, errors }) {
  return (
    <div className={styles.stepContent}>
      <h2>Dites-nous en plus sur votre restaurant</h2>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="5"
          placeholder="Décrivez l'ambiance, vos spécialités, votre histoire..."
          value={data.description}
          onChange={(e) => update({ description: e.target.value })}
          className={errors?.description ? styles.inputError : ""}
        />
        {errors?.description && (
          <span className={styles.errorText}>{errors.description}</span>
        )}

        {!errors?.description && (
          <small>Cette description sera visible par vos clients.</small>
        )}
      </div>
    </div>
  );
}
export default Step1_Info;
