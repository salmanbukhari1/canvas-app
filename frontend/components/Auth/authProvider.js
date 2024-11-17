// components/Auth/authProvider.js
import { useEffect } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../redux/authSlice';

const AuthProvider = ({ children, setUserState }) => {

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

                dispatch(setUser(serializedUser)); // Call the provided function to set the user
            } else {
                // If the user is not logged in, delete the token cookie
                document.cookie = "token=; path=/; max-age=0";
                dispatch(clearUser()); // Call the provided function to clear the user state
            }
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, [setUserState]);

    return <>{children}</>;
};

export default AuthProvider;
