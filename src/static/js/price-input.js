document.addEventListener("DOMContentLoaded", function () {
    const priceInput = document.getElementById("price");

    priceInput.addEventListener("input", function () {
        // Eliminamos cualquier símbolo '$' existente
        let value = this.value.replace(/\$/g, '');

        // Si hay contenido, añadimos '$' al final
        this.value = value ? value + "$" : "";
    });
});