// components/DrawingItem.js
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/List.module.css'


const DrawingItem = ({ drawing }) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the canvas page with the drawing's ID as a query parameter
    router.push(`/draw?drawingId=${drawing.id}`);
  };

  return (
    <li className={styles.gridItem} key={drawing.id} onClick={handleClick}>
      <img src='/images/draw.jpg' alt='' className={styles.gridImage} />
      <div className={styles.gridContent}>
        <h3 className={styles.gridTitle}>{drawing.name}</h3> {/* Display the drawing name or other data */}
        <p className={styles.gridDescription}>{drawing.description}</p> {/* Display a description or other metadata */}  
      </div>
      
    </li>
  );
};

export default DrawingItem;
