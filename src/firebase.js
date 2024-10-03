// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_QFz7r7mLSI1ceM77EVY4m-br8MudqYd4",
  authDomain: "student-deshboard-61ac8.firebaseapp.com",
  projectId: "student-deshboard-61ac8",
  storageBucket: "student-deshboard-61ac8.appspot.com",
  messagingSenderId: "896121184012",
  appId: "1:896121184012:web:10e9c8577fd1c8404b7329",
  measurementId: "G-843GV1S0R2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
