// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC8UIU_Gr-DPz6nMHszhUk-ppwrRkFOQUs",
  authDomain: "empower-1211.firebaseapp.com",
  projectId: "empower-1211",
  storageBucket: "empower-1211.firebasestorage.app",
  messagingSenderId: "591991209544",
  appId: "1:591991209544:web:5ed2ee6b03f7867ce3227d",
  measurementId: "G-N15T86H5LG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
