document.addEventListener("DOMContentLoaded", function () {
    const categoryButton = document.getElementById("categoryDropdown");
    const categoryItems = document.querySelectorAll(".dropdown-item");

    categoryItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault(); // Evita que la página recargue
            categoryButton.textContent = this.dataset.value; // Cambia el texto del botón
        });
    });
});