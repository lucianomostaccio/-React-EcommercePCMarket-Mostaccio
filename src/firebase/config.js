// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6P8N8rCidbhQmMRNqHt6dBCgg5WdC3-s",
  authDomain: "pc-market-react.firebaseapp.com",
  projectId: "pc-market-react",
  storageBucket: "pc-market-react.appspot.com",
  messagingSenderId: "616773988326",
  appId: "1:616773988326:web:ff40465b03a17920177027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
