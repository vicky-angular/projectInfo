// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGYJbUFDFkZNV9yX9MT6pjyCXzcYiqIC0",
  authDomain: "uapmc-6d336.firebaseapp.com",
  projectId: "uapmc-6d336",
  storageBucket: "uapmc-6d336.appspot.com",
  messagingSenderId: "673495254884",
  appId: "1:673495254884:web:1f1c2047af2b3cc26c5c71",
  measurementId: "G-Q1RE8JL47B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db}