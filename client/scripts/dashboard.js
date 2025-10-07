import { checkAuth } from "./auth.js";
import { initHydration } from "./hydration.js";
import { initProfile } from "./profile.js";
import { initFeedback } from "./feedback.js";
import { initProducts } from "./products.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
    checkAuth();

     // LOGOUT
    const logoutButton = document.querySelector(".logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            signOut(auth)
                .then(() => {
                    localStorage.removeItem("userEmail");
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("Logout failed:", error.message);
                });
        });
    }



    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    const name = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);

    document.getElementById("user-email").textContent = `Email: ${userEmail}`;
    const welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${name} 🌸`;
    }

    initHydration(name);
    initProfile(name, userEmail);
    initFeedback(name);
    initProducts();

   // JOURNAL LOGIC
const journalForm = document.getElementById("journal-form");
const journalEntry = document.getElementById("journal-entry");
const journalLog = document.getElementById("journal-log");

// Load saved entries
const savedEntries = JSON.parse(localStorage.getItem("praqconJournal")) || [];
journalLog.innerHTML = savedEntries.map(entry => `<p>📝 ${entry}</p>`).join("");

// Save new entry
journalForm.querySelector("button").addEventListener("click", () => {
  const entry = journalEntry.value.trim();
  if (!entry) return;

  const timestamp = new Date().toLocaleString();
  const formattedEntry = `${timestamp} – ${entry}`;

  savedEntries.push(formattedEntry);
  localStorage.setItem("praqconJournal", JSON.stringify(savedEntries));
  journalLog.innerHTML += `<p>📝 ${formattedEntry}</p>`;
  journalEntry.value = "";
}); 
});
console.log("Dashboard JS is running");