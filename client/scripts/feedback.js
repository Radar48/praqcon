export function initFeedback(name) {
    const feedbackDisplay = document.getElementById("ai-feedback-display");
    const toggleBtn = document.getElementById("toggle-feedback");
    const moodSelect = document.getElementById("mood-select");
    const routineCheckboxes = document.querySelectorAll(".routine input[type='checkbox']");
    const productInputs = document.querySelectorAll(".products input[type='text']");
    const historyList = document.getElementById("history-list");
    const clearButton = document.getElementById("clear-history-button");
    const clearConfirmation = document.getElementById("clear-confirmation");

    let showingSummary = false;

    function generateFeedbackView(name, affirmation) {
        return `
        <p>Hi ${name}, here's your personalized skin insight for today 🌸</p>
        <p>${affirmation}</p>
        <p>You're doing beautifully; your skin is listening, and your consistency is shining through.</p>
        `;
    }

    function generateSummaryView(name, mood, routineDone, products, affirmation) {
        let summary = `<p><strong>User:</strong> ${name}</p>`;
        summary += `<p><strong>Mood:</strong> ${mood}</p>`;
        summary += `<p><strong>Routine Completed:</strong> ${routineDone.length > 0 ? routineDone.join(", ") : "None"}</p>`;
        summary += `<p><strong>Products Used:</strong></p><ul>`;
        products.forEach(p => {
        summary += `<li><strong>${p.name}</strong>: "${p.feeling}"</li>`;
        });
        summary += `</ul>`;
        summary += `<p><strong>Affirmation:</strong> ${affirmation}</p>`;
        return summary;
    }

    function updateFeedbackView() {
        const mood = moodSelect?.value || "Neutral";
        const routineSteps = Array.from(routineCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.parentElement.textContent.trim());

        const products = [
        { name: document.getElementById("cleanser").value, feeling: document.getElementById("cleanser-feeling").value },
        { name: document.getElementById("toner").value, feeling: document.getElementById("toner-feeling").value },
        { name: document.getElementById("moisturizer").value, feeling: document.getElementById("moisturizer-feeling").value },
        { name: document.getElementById("spf").value, feeling: document.getElementById("spf-feeling").value },
        { name: document.getElementById("others").value, feeling: document.getElementById("other-feeling").value }
        ].filter(p => p.name || p.feeling);

        const affirmations = [
        "Every step counts. You're nurturing your skin and your spirit.",
        "Consistency is your superpower. Keep glowing.",
        "Your skin is listening. Keep showing up with care.",
        "Hydration, patience, and love; your skin thanks you."
        ];
        const affirmation = affirmations[routineSteps.length % affirmations.length];

        const content = showingSummary
        ? generateSummaryView(name, mood, routineSteps, products, affirmation)
        : generateFeedbackView(name, affirmation);

        feedbackDisplay.innerHTML = content;
        saveFeedbackToHistory(content);
    }

    function saveFeedbackToHistory(content) {
        const history = JSON.parse(localStorage.getItem("feedbackHistory")) || [];
        const timestamp = new Date().toLocaleString();
        history.unshift({ timestamp, content });
        localStorage.setItem("feedbackHistory", JSON.stringify(history));
        renderFeedbackHistory();
    }

    function renderFeedbackHistory() {
        const history = JSON.parse(localStorage.getItem("feedbackHistory")) || [];
        historyList.innerHTML = history.length === 0
        ? "<p>No feedback history yet.</p>"
        : history.map(entry => `
            <div class="history-entry">
            <p><strong>${entry.timestamp}</strong></p>
            <div>${entry.content}</div>
            </div>
        `).join("");
    }

    toggleBtn?.addEventListener("click", () => {
        showingSummary = !showingSummary;
        updateFeedbackView();
    });

    moodSelect?.addEventListener("change", updateFeedbackView);
    routineCheckboxes.forEach(cb => cb.addEventListener("change", updateFeedbackView));
    productInputs.forEach(input => input.addEventListener("input", updateFeedbackView));

    clearButton?.addEventListener("click", () => {
        localStorage.removeItem("feedbackHistory");
        renderFeedbackHistory();
        clearConfirmation.textContent = "✅ Your feedback history has been cleared.";
    });

    // Initial render
    updateFeedbackView();
    renderFeedbackHistory();
}
