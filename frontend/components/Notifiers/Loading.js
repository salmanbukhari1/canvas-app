// components/Loading.js
import React from 'react';
import styles from '../../styles/Loading.module.css'; // Import the CSS file in your app

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.loadingContainer}> 
      <div className={styles.loadingSpinner}>
        <div className={styles.spinner}></div>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
