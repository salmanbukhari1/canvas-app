// components/DrawingsList.js
import { useEffect } from 'react';
import DrawingItem from './DrawingItem';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawings } from '../../redux/drawingsSlice';
import styles from '../../styles/List.module.css'

const DrawingsList = ({drawings}) => {
  
  const dispatch = useDispatch();
  drawings = useSelector((state) => state.drawings.drawings);

  useEffect(() => {
    if (drawings) {
      dispatch(setDrawings(drawings));
    }
  }, [dispatch, drawings]);

  return (
    <div>
      <h2>Your Drawings</h2>
      <ul className={styles.gridContainer}>
        {drawings.length === 0 ? (
          <p>No drawings available.</p>
        ) : (
          drawings.map((drawing) => (
            <DrawingItem key={drawing.id} drawing={drawing} />
          ))
        )}
      </ul>
    </div>
  );
};

export default DrawingsList;
