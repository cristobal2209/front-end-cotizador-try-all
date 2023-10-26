import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNGbNVmCh1TenQobzgooKuU2AkQrJqbYI",
  authDomain: "fb-cotizaciones-try-all.firebaseapp.com",
  projectId: "fb-cotizaciones-try-all",
  storageBucket: "fb-cotizaciones-try-all.appspot.com",
  messagingSenderId: "1039110335232",
  appId: "1:1039110335232:web:3fb2cef6304de1d69aa1e5",
  measurementId: "G-ZREP3CE3NP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
