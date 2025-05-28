// src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 Tu configuración personalizada (copiada de Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCcj-rhs-OfRt-C-DZ9r69fcInO12Wlsuo",
  authDomain: "authtscweb.firebaseapp.com",
  projectId: "authtscweb",
  storageBucket: "authtscweb.firebasestorage.app",
  messagingSenderId: "991596302671",
  appId: "1:991596302671:web:f4a8522116dc452c31f53a",
  measurementId: "G-TVLD998C60" // <-- No se usa, no importa si queda
};

// 🚀 Inicializamos la app
const app = initializeApp(firebaseConfig);

// 🔧 Servicios que SÍ necesitas
const auth = getAuth(app); // Para login
const provider = new GoogleAuthProvider(); // Para login con Google
const db = getFirestore(app); // Para Firestore

// 🔁 Exportamos para usarlos en otras partes del proyecto
export { auth, provider, db };
