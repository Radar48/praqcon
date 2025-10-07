

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjSDy3PgFVJvJPqaYEus-Y3lW7HCkz3KI",
  authDomain: "praqcon.firebaseapp.com",
  projectId: "praqcon",
  storageBucket: "praqcon.appspot.com",
  messagingSenderId: "114862281833",
  appId: "1:114862281833:web:393928d04ce51d7d39bef8",
  measurementId: "G-LZNFFKDPCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const analytics = getAnalytics(app);