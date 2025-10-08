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

const beforePhotoInput = document.getElementById("before-photo");
const afterPhotoInput = document.getElementById("after-photo");
const compareButton = document.querySelector("#progress-form button");
const progressPreview = document.getElementById("progress-preview");

compareButton.addEventListener("click", () => {
    const beforeFile = beforePhotoInput.files[0];
    const afterFile = afterPhotoInput.files[0];

    if (!beforeFile || !afterFile) {
        alert("Please upload both photos to compare.");
        return;
    }

    const beforeReader = new FileReader();
    const afterReader = new FileReader();

    beforeReader.onload = () => {
        const beforeImg = document.createElement("img");
        beforeImg.src = beforeReader.result;
        beforeImg.style.width = "200px";
        beforeImg.style.marginRight = "20px";

        afterReader.onload = () => {
        const afterImg = document.createElement("img");
        afterImg.src = afterReader.result;
        afterImg.style.width = "200px";

        progressPreview.innerHTML = "<h3>Before vs After</h3>";
        progressPreview.appendChild(beforeImg);
        progressPreview.appendChild(afterImg);
        };

        afterReader.readAsDataURL(afterFile);
    };

    beforeReader.readAsDataURL(beforeFile);
});

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