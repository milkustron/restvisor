function initPriceInput() {
    const priceInput = document.getElementById("price");
    if (!priceInput) return;

    priceInput.addEventListener("input", function () {
        let value = this.value.replace(/[^0-9]/g, ''); // Permitir solo números

        if (value.length > 0) {
            this.value = value + "$"; // Añadir el $ detras del número
        } else {
            this.value = ""; // Si está vacío, no poner el $
        }
    });

    // Asegurar que al cargar la página, el campo tenga el $ si hay un valor
    if (priceInput.value && !priceInput.value.includes("$")) {
        priceInput.value = "$" + priceInput.value;
    }
}

// Verificar si el DOM ya está listo o esperar a que cargue
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPriceInput);
} else {
    initPriceInput();
}



