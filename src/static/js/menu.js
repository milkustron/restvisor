document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url, callback) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar ${url}: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                let element = document.getElementById(id);
                if (!element) {
                    console.error(`Elemento con ID "${id}" no encontrado en el DOM.`);
                    return;
                }
                element.innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error("Error cargando el componente:", error));
    }

    // Cargar componentes
    loadComponent("edit-table", "../templates/fragments/edit-menutable.html", function () {
        let priceScript = document.createElement("script");
        priceScript.src = "../static/js/price-input.js";
        document.body.appendChild(priceScript);

        let categoryScript = document.createElement("script");
        categoryScript.src = "../static/js/category-input.js";
        document.body.appendChild(categoryScript);
    });

    loadComponent("navbarmenu", "../templates/fragments/navbaroperationmenu.html");
    loadComponent("data-table", "../templates/fragments/menu-table.html");
    loadComponent("eliminationModal", "../templates/fragments/modals/elimination-modal.html");
    loadComponent("editModal", "../templates/fragments/modals/editmenu-modal.html");
    loadComponent("cards", "../templates/fragments/menu-cards.html");
});
