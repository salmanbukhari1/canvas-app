// frontend/pages/index.js
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '../components/Controls/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDrawing, saveUserDrawing } from '../lib/api';
import { addShape, updateShape, setShapes } from '../redux/canvasSlice';
import ErrorNotification from '../components/Notifiers/ErrorNotification';

const Canvas = dynamic(() => import('../components/Canvas/Canvas'), {
    ssr: false,
});

export default function Draw({ drawing, token, error }) {

  console.log("token_thend:", token)
  const dispatch = useDispatch();
  const [errorState, setError]=useState(error);
  const shapes = useSelector(state => state.canvas.shapes);

  const handleAddShape = (newShape) => {
    dispatch(addShape(newShape));
  };

  const handleUpdateShape = (updatedShape) => {
    dispatch(updateShape(updatedShape));
  };

  const handleSave = async () => {
    console.log("token_then:", token)

    try {
      await saveUserDrawing(token, shapes, drawing?.id);
    } catch (error) {
      setError(errorState);
    }
  };
  
  useEffect(() => {
      if (drawing) {
        dispatch(setShapes(drawing.shapes));
      }
  }, [dispatch, drawing]);

  return (
    <>  
      <Button onClick={handleSave} >Save</Button>
      <Canvas 
        shapes={shapes}  // Pass shapes as a prop
        onAddShape={handleAddShape}
        onUpdateShape={handleUpdateShape}
      />
      {error && <ErrorNotification message={error} />}
    </>
  );
};

// get a specific drawing for the user
export async function getServerSideProps(context) {
  
  const { req } = context;
  const token = req.cookies.token; // The Firebase ID token should be passed in cookies
  const { drawingId } = context.query; // Get the drawingId from the URL params
  let error=null;
  let drawing = null;

  if (drawingId) {
    try {
      drawing = await getUserDrawing(token, drawingId)
    } catch (error) {
      error=error;
    }
  }

  return {
    props: {
      drawing,
      token, 
      error
    },
  };
}
