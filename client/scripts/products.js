export function initProducts() {
    const saveButton = document.getElementById("save-products");

    if (!saveButton) return;

    saveButton.addEventListener("click", () => {
        const products = {
        cleanser: document.getElementById("cleanser").value,
        toner: document.getElementById("toner").value,
        moisturizer: document.getElementById("moisturizer").value,
        spf: document.getElementById("spf").value,
        others: document.getElementById("others").value
        };

        localStorage.setItem("praqconProducts", JSON.stringify(products));
        alert("✅ Products saved!");
    });
}