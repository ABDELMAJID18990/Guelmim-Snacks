import React from 'react';
import styles from './Input.module.css';


function Input({ icon, ...props }) {
  return (
    <div className={styles.inputWrapper}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input className={styles.input} {...props} />
    </div>
  );
}

export default Input;