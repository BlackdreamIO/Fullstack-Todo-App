// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VITE_API_FIREBASE_API,
  authDomain: process.env.VITE_API_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_API_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_API_FIREBASE_MSG_ID,
  appId: process.env.VITE_API_FIREBASE_APP_ID,
  measurementId: process.env.VITE_API_FIREBASE_MESUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth(app);

export { db, app, auth };