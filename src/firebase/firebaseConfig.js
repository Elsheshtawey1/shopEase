// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB-jokI-mnMhbyPVugyHUu97A0Ct8xKS58",
  authDomain: "ecommerce-app-6f9a4.firebaseapp.com",
  projectId: "ecommerce-app-6f9a4",
  storageBucket: "ecommerce-app-6f9a4.firebasestorage.app",
  messagingSenderId: "793227885546",
  appId: "1:793227885546:web:a6b56149f2e5ae6cdb9093",
  measurementId: "G-2Z7PV4DZQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Analytics = getAnalytics(app);
const auth = getAuth(app);
export default app;
export { Analytics, auth };