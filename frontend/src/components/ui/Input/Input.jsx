import React from 'react';
import styles from './Input.module.css';


function Input({ icon, error, ...props }) {
   return (
    <div className={styles.inputWrapper}>
      <div className={`${styles.inputContainer} ${error ? styles.hasError : ''}`}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input className={styles.input} {...props} />
      </div>
      {/* Message d'erreur sous le champ */}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default Input;