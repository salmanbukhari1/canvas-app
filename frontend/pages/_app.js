// frontend/pages/_app.js
import '../styles/globals.css';
import { useEffect } from "react";
import { store } from '../redux/store';
import { auth } from "../lib/firebase";
import Header from '../components/Layout/Header';
import { onAuthStateChanged } from "firebase/auth";
import { Provider, useDispatch } from 'react-redux';
import Container from '../components/Layout/Container';
import { setUser, clearUser, setLoading } from "../redux/authSlice";

function AuthProvider({ children }) {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const serializedUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            };

            // If the user is logged in, get the Firebase ID token
            const token = await user.getIdToken();

            // Set token as a cookie so it can be sent with every server-side request
            document.cookie = `token=${token}; path=/`;

            dispatch(setUser(serializedUser)); // Update Redux with the authenticated user

        } else {
            // If the user is not logged in, delete the token cookie
            document.cookie = 'token=; path=/; max-age=0';
            dispatch(clearUser(null)); // Clear user from Redux when logged out
        }
        dispatch(setLoading(false));
      });
  
      // Clean up the listener on component unmount
      return () => unsubscribe();
    }, [dispatch]);
  }

function MyApp({ Component, pageProps }) {

  return (
      <Provider store={store}>
          <Header />
          <AuthProvider />
          <Container>
            <Component {...pageProps} />
          </Container>
      </Provider>
  );
}

export default MyApp;
