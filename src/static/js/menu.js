document.addEventListener("DOMContentLoaded", function () {

    // Cargar componentes
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

    // Función para cargar los datos del menú y los textos desde el JSON
    function loadMenuData() {
        fetch('../static/data/menu-data.json')  // Ruta del archivo JSON
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const menuItems = data.menuItems;
                const tableBody = document.querySelector("#menu-table-body");
                const pageTitle = data.textContent.pageTitle;
                const addButtonText = data.textContent.addButton;

                // Limpiar la tabla actual
                tableBody.innerHTML = "";

                // Actualizar los textos de la página
                document.querySelector("h2").textContent = pageTitle;
                document.querySelector("a.btn").textContent = addButtonText;

                // Insertar los datos del menú en la tabla
                menuItems.forEach(item => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td><img src="${item.image}" alt="Dish Image" style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid white; object-fit: cover;"></td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.description}</td>
                        <td>${item.category}</td>
                        <td><button style="border: none; background: none; padding: 0;" data-bs-toggle="modal" data-bs-target="#editModal"><img src="../static/images/edit.png" alt="Edit" style="width: 35px; height: 28px;"></button></td>
                        <td><button style="border: none; background: none; padding: 0;" data-bs-toggle="modal" data-bs-target="#eliminationModal"><img src="../static/images/bin.png" alt="Delete" style="width: 35px; height: 28px;"></button></td>
                    `;

                    tableBody.appendChild(row);
                });

                // Actualizar textos de los modales
                const editModalTitle = data.textContent.modals.edit.title;
                const editModalMessage = data.textContent.modals.edit.message;
                const editModalCancel = data.textContent.modals.edit.cancelButton;
                const editModalConfirm = data.textContent.modals.edit.confirmButton;

                const eliminateModalTitle = data.textContent.modals.eliminate.title;
                const eliminateModalMessage = data.textContent.modals.eliminate.message;
                const eliminateModalCancel = data.textContent.modals.eliminate.cancelButton;
                const eliminateModalConfirm = data.textContent.modals.eliminate.confirmButton;

                document.querySelector("#editModal .modal-title").textContent = editModalTitle;
                document.querySelector("#editModal .modal-body h4").textContent = editModalMessage;
                document.querySelector("#editModal .modal-footer .gray-button").textContent = editModalCancel;
                document.querySelector("#editModal .modal-footer .black-button").textContent = editModalConfirm;

                document.querySelector("#eliminationModal .modal-title").textContent = eliminateModalTitle;
                document.querySelector("#eliminationModal .modal-body h4").textContent = eliminateModalMessage;
                document.querySelector("#eliminationModal .modal-footer .gray-button").textContent = eliminateModalCancel;
                document.querySelector("#eliminationModal .modal-footer .black-button").textContent = eliminateModalConfirm;
            })
            .catch(error => console.error('Error al cargar los datos del menú y textos:', error));
    }

    // Cargar los componentes de la página
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

    // Cargar los datos y textos de la página
    loadMenuData();  // Llamamos a la función para cargar los datos al cargar la página

});

