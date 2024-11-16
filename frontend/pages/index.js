import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDrawings } from '../redux/drawingsSlice';
import { getMultipleUserDrawings } from '../lib/api';
import DrawingsList from '../components/Lists/DrawingsList';
import ErrorNotification from '../components/Notifiers/ErrorNotification';

export default function Home({drawings, error}) { 
    const dispatch = useDispatch();

    useEffect(() => {
        if (drawings) {
          dispatch(setDrawings(drawings));
        }
    }, [dispatch, drawings]);

    return (
        <>  
            <DrawingsList />
            {error && <ErrorNotification message={error} />}
        </>
    );
}

// render this list on the server side for a fast render on client side intially
export async function getServerSideProps(context) {

    const { req } = context;
    const token = req.cookies.token; // The Firebase ID token should be passed in cookies
    let error=null;
    let drawings=null;

    if (!token) {
        return {
          redirect: {
            destination: '/login', // Redirect to login if token is missing
            permanent: false,
          },
        };
    }
    
    try {
        drawings = await getMultipleUserDrawings(token);   
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
