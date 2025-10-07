import { auth } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("userEmail", userCredential.user.email);
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 100);
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  });
}

// SIGNUP
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("userEmail", userCredential.user.email);
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 100);
      })
      .catch((error) => {
        alert("Signup failed: " + error.message);
      });
  });
}

// Auth check for protected pages
export function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}