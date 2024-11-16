// Button.js
import React from 'react';
import styles from '../../styles/Button.module.css';

const Button = ({ children, onClick, variant }) => {
  // Dynamically assign class based on the variant (e.g., login, logout)
  const buttonClass = variant ? styles[variant] : '';
  
  return (
    <button className={`${styles.button} ${buttonClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
