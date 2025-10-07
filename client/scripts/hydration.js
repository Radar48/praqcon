export function initHydration(name) {
    const hydrationCountDisplay = document.getElementById("hydration-count");
    const addWaterButton = document.getElementById("add-water");

    if (!hydrationCountDisplay || !addWaterButton) return;

    const today = new Date().toDateString();
    const lastHydrationDate = localStorage.getItem("hydrationDate");
    let hydrationCount = parseInt(localStorage.getItem("hydrationCount")) || 0;

    if (lastHydrationDate !== today) {
        hydrationCount = 0;
        localStorage.setItem("hydrationDate", today);
        localStorage.setItem("hydrationCount", hydrationCount);
    }

    hydrationCountDisplay.innerHTML = `You've had <strong>${hydrationCount}</strong> glasses of water today.`;

    addWaterButton.addEventListener("click", () => {
        hydrationCount++;
        localStorage.setItem("hydrationCount", hydrationCount);
        hydrationCountDisplay.innerHTML = `You've had <strong>${hydrationCount}</strong> glasses of water today.`;

        if (Notification.permission === "granted") {
        new Notification("Praqcon Hydration", { body: "💧 Great job! Keep sipping." });
        }
    });

    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}