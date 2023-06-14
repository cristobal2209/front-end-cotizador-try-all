// Importa las bibliotecas de Firebase necesarias
import firebase from "firebase/app";
import "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDNGbNVmCh1TenQobzgooKuU2AkQrJqbYI",
    authDomain: "fb-cotizaciones-try-all.firebaseapp.com",
    projectId: "fb-cotizaciones-try-all",
    storageBucket: "fb-cotizaciones-try-all.appspot.com",
    messagingSenderId: "1039110335232",
    appId: "1:1039110335232:web:3fb2cef6304de1d69aa1e5",
    measurementId: "G-ZREP3CE3NP"
};

// Inicializa Firebase con la configuración
firebase.initializeApp(firebaseConfig);

// Exporta la instancia de Firestore
export const db = firebase.firestore();
