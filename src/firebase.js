// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdF46a-9KHcvZBZZNwOqFnOZfc_Z4U9Gg",
  authDomain: "project-cost-tracker-8e912.firebaseapp.com",
  projectId: "project-cost-tracker-8e912",
  storageBucket: "project-cost-tracker-8e912.firebasestorage.app",
  messagingSenderId: "917844409279",
  appId: "1:917844409279:web:9c6c0270651bcceb153f0a",
  measurementId: "G-T63J7JYZ8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);