import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "zeon-store-4f9c8.firebaseapp.com",
    projectId: "zeon-store-4f9c8",
    storageBucket: "zeon-store-4f9c8.appspot.com",
    messagingSenderId: "238487415583",
    appId: "1:238487415583:web:68834c26d3e9c44b441e2a"
  };

const app = initializeApp(firebaseConfig);