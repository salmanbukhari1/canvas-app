import React, { useState } from 'react';
import styles from '../../styles/ErrorNotification.module.css'; // Import the CSS module

const ErrorNotification = ({ message }) => {
  return (
    <div className={styles.errorNotification}>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default ErrorNotification;
