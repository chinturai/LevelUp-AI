import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0q2mkyIRigpQ_qCcwPbuWOg__jETcI9Y",
  authDomain: "levelup-ai-chintu-rai.firebaseapp.com",
  projectId: "levelup-ai-chintu-rai",
  storageBucket: "levelup-ai-chintu-rai.firebasestorage.app",
  messagingSenderId: "735070296784",
  appId: "1:735070296784:web:7bb2557a2c1e184b2f5cd5",
  measurementId: "G-LW1E8WG8NE"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);