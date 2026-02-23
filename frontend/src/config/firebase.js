import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "login-to-examnotes.firebaseapp.com",
  projectId: "login-to-examnotes",
  storageBucket: "login-to-examnotes.firebasestorage.app",
  messagingSenderId: "277630909878",
  appId: "1:277630909878:web:e6b257fcb0ff6851875517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const login = getAuth(app);

const provider = new GoogleAuthProvider();

export {login , provider}