// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_KEY,
  authDomain: "fir-2e7f2.firebaseapp.com",
  projectId: "fir-2e7f2",
  storageBucket: "fir-2e7f2.firebasestorage.app",
  messagingSenderId: "555800197112",
  appId: "1:555800197112:web:5a1e7d4dabd92438e7480d",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

const provider= new GoogleAuthProvider()

export {auth,provider}
