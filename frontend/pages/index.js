import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Button from '../components/Controls/Button';
import { setDrawings } from '../redux/drawingsSlice';
import { getMultipleUserDrawings } from '../services/drawingService';
import DrawingsList from '../components/Lists/DrawingsList';
import ErrorNotification from '../components/Notifiers/ErrorNotification';

export default function Home({drawings, error}) { 
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (drawings) {
          dispatch(setDrawings(drawings));
        }
    }, [dispatch, drawings]);

    const handleCreateNewDrwaing = () => {
        router.push('/draw');
    };

    return (
        <>  
            <span className={"inline mb-30"}>
                <Button onClick={handleCreateNewDrwaing} variant={"secondaryButton"}>
                    Create New
                </Button>
            </span>
            <DrawingsList />
            {error && <ErrorNotification message={error} />}
        </>
    );
}

// render this list on the server side for a fast render on client side intially
export async function getServerSideProps(context) {

    const { req } = context;
    let error=null;
    let drawings=null;
    
    try {
        drawings = await getMultipleUserDrawings(req);   
    } catch (error) {
        error=error;
    }

    return {
        props: {
            drawings,
            error
        },
    };      
}
