export function initProfile(name, userEmail) {
    const form = document.getElementById("profile-form");
    const display = document.getElementById("profile-display");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const skinType = form.skinType.value;
        const goal = form.goal.value.trim();

        if (!skinType || !goal) {
        display.innerHTML = `<p style="color: red;">Please fill in both fields.</p>`;
        return;
        }

        const formattedSkinType = skinType.charAt(0).toUpperCase() + skinType.slice(1).toLowerCase();
        const formattedGoal = goal.charAt(0).toUpperCase() + goal.slice(1).toLowerCase();

        const encouragement = `You're doing amazing, ${name}. With your goal to ${formattedGoal.toLowerCase()}, you're on a beautiful journey. Keep glowing!`;

        const profileData = {
        email: userEmail,
        skinType: formattedSkinType,
        goal: formattedGoal,
        encouragement
        };

        localStorage.setItem("praqconProfile", JSON.stringify(profileData));

        display.innerHTML = `
        <h2>My Profile</h2>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Skin Type:</strong> ${formattedSkinType}</p>
        <p><strong>Goal:</strong> ${formattedGoal}</p>
        <p>${encouragement}</p>
        `;

        form.reset();
    });
}