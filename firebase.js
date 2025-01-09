// Importar e inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3uLUmRyK4NhPOS-eWM4R9Ly8qhiXAg-k",
    authDomain: "fraternidad1-asistencia.firebaseapp.com",
    projectId: "fraternidad1-asistencia",
    storageBucket: "fraternidad1-asistencia.firebasestorage.app",
    messagingSenderId: "344406075668",
    appId: "1:344406075668:web:8105371a937130a3923a01",
    measurementId: "G-KKF4Q3B11B"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
