// frontend/pages/index.js
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '../components/Controls/Button';
import Loading from '../components/Notifiers/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDrawing, saveUserDrawing } from '../services/drawingService';
import { addShape, updateShape, setShapes } from '../redux/canvasSlice';
import ErrorNotification from '../components/Notifiers/ErrorNotification';

const Canvas = dynamic(() => import('../components/Canvas/Canvas'), {
    ssr: false,
});

export default function Draw({ drawing, error }) {

  const dispatch = useDispatch();
  const [errorState, setError]=useState(error);
  const [saving, setSaving]=useState(false);
  const shapes = useSelector(state => state.canvas.shapes);
  
  const handleAddShape = (newShape) => {
    dispatch(addShape(newShape));
  };

  const handleUpdateShape = (updatedShape) => {
    dispatch(updateShape(updatedShape));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // save the shapes for the current drawing
      await saveUserDrawing(shapes, drawing?.id);
      
    } catch (error) {
      //set error state
      setError(errorState);
      
    } finally {
      setSaving(false);
    }
  };
  
  useEffect(() => {

    if (drawing) {
      dispatch(setShapes(drawing.shapes));
    } else {
      dispatch(setShapes([]));
    }

  }, [dispatch, drawing]);

  return (
    <>  
      <Button onClick={handleSave} variant={"secondaryButton"}>Save</Button>
      <Canvas 
        shapes={shapes}  // Pass shapes as a prop
        onAddShape={handleAddShape}
        onUpdateShape={handleUpdateShape}
      />
      {errorState && <ErrorNotification message={errorState} />}
      {saving && <Loading message={"Saving..."} />}
    </>
  );
};

// get a specific drawing for the user
export async function getServerSideProps(context) {
  
  const { req } = context;
  const { drawingId } = context.query; // Get the drawingId from the URL params
  
  let error=null;
  let drawing = null;

  if (drawingId) {
    try {
      // try and get the user drawing
      drawing = await getUserDrawing(req, drawingId)
    } catch (error) {
      // if something goes wrong
      error=error;
    }
  }

  return {
    props: {
      drawing, 
      error
    },
  };
}
