// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const BASE_URL = process.env.REACT_APP_FIREBASE_API;
console.log(BASE_URL);

const firebaseConfig = {
  apiKey: "AIzaSyA80iLavHyrCtzG2YARjbu1kkRNEwIfndA",
  authDomain: "c-io-82d8d.firebaseapp.com",
  projectId: "c-io-82d8d",
  storageBucket: "c-io-82d8d.appspot.com",
  messagingSenderId: "1041728718680",
  appId: "1:1041728718680:web:0e529e18c1afd6ba4cc72d",
  measurementId: "G-PQ6RRBX4VS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export default db;