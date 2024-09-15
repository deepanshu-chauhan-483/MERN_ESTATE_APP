// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { configDotenv } from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-app-797de.firebaseapp.com",
  projectId: "mern-estate-app-797de",
  storageBucket: "mern-estate-app-797de.appspot.com",
  messagingSenderId: "379332031457",
  appId: "1:379332031457:web:ec5411ec6872affd4458a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);