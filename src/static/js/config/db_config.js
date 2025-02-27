// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA0F5IMNmmU2O55YdFN_CoORSt5nflovgE",
    authDomain: "restvisor.firebaseapp.com",
    projectId: "restvisor",
    storageBucket: "restvisor.firebasestorage.app",
    messagingSenderId: "864329171255",
    appId: "1:864329171255:web:12e8d658431bfe1f97dab2",
    measurementId: "G-7N2QXRF29W"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc};