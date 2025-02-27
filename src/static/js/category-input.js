function initCategoryDropdown() {
    const categoryButton = document.getElementById("categoryDropdown");
    if (!categoryButton) return;

    const categoryItems = document.querySelectorAll(".dropdown-item");
    if (categoryItems.length === 0) return;

    categoryItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            categoryButton.textContent = this.dataset.value;
        });
    });
}

// Verificar si el DOM ya está listo o esperar a que cargue
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCategoryDropdown);
} else {
    initCategoryDropdown();
}


