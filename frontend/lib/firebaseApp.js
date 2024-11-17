// lib/firebaseApp.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication
const auth = getAuth(app);

export { app, auth };
