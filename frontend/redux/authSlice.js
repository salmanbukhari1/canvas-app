import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from '../lib/firebase'; // Import only the Firebase functions

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      const firebaseUser = action.payload;
      state.user = firebaseUser
        ? {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          }
        : null;
      // state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError, clearUser } = authSlice.actions;

/**
 * Registers a new user with the given email and password.
 * 
 * This function uses Firebase Authentication to create a new user. It dispatches
 * actions to set loading state, set the user data on successful registration,
 * and handle any errors that occur during the process.
 * 
 * @param {string} email - The email address of the user to register.
 * @param {string} password - The password for the user.
 * @returns {Promise<void>} A promise that resolves when the user is successfully registered or an error occurs.
 */
export const registerUserAsync = (email, password) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const user = await registerUser(email, password); // Use the Firebase function
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Logs in an existing user with the given email and password.
 * 
 * This function uses Firebase Authentication to sign in an existing user. It dispatches
 * actions to set loading state, set the user data on successful login,
 * and handle any errors that occur during the process.
 * 
 * @param {string} email - The email address of the user attempting to log in.
 * @param {string} password - The password for the user.
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged in or an error occurs.
 */
export const loginUserAsync = (email, password) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const user = await loginUser(email, password); // Use the Firebase function
    dispatch(setUser(user));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Logs out the currently authenticated user.
 * 
 * This function uses Firebase Authentication to sign out the currently authenticated user. 
 * It dispatches actions to set loading state, clear the user data upon successful logout,
 * and handle any errors that may occur during the process.
 * 
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged out or an error occurs.
 */
export const logoutUserAsync = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    await logoutUser(); // Use the Firebase function
    dispatch(setUser(null)); // Clear the user state on logout
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
