// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnXn_7rSXZ2PiVWQHlX3AiiMLa6NNqIZg",
  authDomain: "projects-cc942.firebaseapp.com",
  projectId: "projects-cc942",
  storageBucket: "projects-cc942.appspot.com",
  messagingSenderId: "510280309872",
  appId: "1:510280309872:web:880d36b750881e6b01e8b5",
  measurementId: "G-RC93FREFSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db}