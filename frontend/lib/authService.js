// lib/authService.js
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    setPersistence, 
    browserLocalPersistence, 
    signOut 
  } from "firebase/auth";
  import { auth } from "./firebaseApp";
  
  /**
   * Registers a new user with Firebase Authentication.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<Object>} - Firebase user object.
   */
  export const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw (error.message);
    }
  };
  
  /**
   * Logs in an existing user with Firebase Authentication.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<Object>} - Firebase user object.
   */
  export const loginUser = async (email, password) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw (error.message);
    }
  };
  
  /**
   * Logs out the currently authenticated user.
   * @returns {Promise<void>}
   */
  export const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw (error.message);
    }
  };
  