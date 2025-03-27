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

    // Cargar los datos de la tabla de menú
    function loadMenuTableData(data) {
        const tableBody = document.querySelector("#menu-table-body");
        tableBody.innerHTML = "";  // Limpiar la tabla actual

        // Insertar los datos del menú en la tabla
        data.menuItems.forEach(item => {
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

        // Actualizar textos de la página
        document.querySelector("h2").textContent = data.textContent.pageTitle;
        document.querySelector("a.btn").textContent = data.textContent.addButton;
    }



    // Cargar los textos del modal de edición
    function loadEditMenuModalData(data) {
        document.querySelector("#editModal .modal-title").textContent = data.textContent.modals.edit.title;
        document.querySelector("#editModal .modal-body h4").textContent = data.textContent.modals.edit.message;
        document.querySelector("#editModal .modal-footer .gray-button").textContent = data.textContent.modals.edit.cancelButton;
        document.querySelector("#editModal .modal-footer .black-button").textContent = data.textContent.modals.edit.confirmButton;
    }

    // Cargar los textos del modal de eliminación
    function loadEliminationModalData(data) {
        document.querySelector("#eliminationModal .modal-title").textContent = data.textContent.modals.eliminate.title;
        document.querySelector("#eliminationModal .modal-body h4").textContent = data.textContent.modals.eliminate.message;
        document.querySelector("#eliminationModal .modal-footer .gray-button").textContent = data.textContent.modals.eliminate.cancelButton;
        document.querySelector("#eliminationModal .modal-footer .black-button").textContent = data.textContent.modals.eliminate.confirmButton;
    }

    // Cargar los textos de la página de edición del menú
    function loadEditMenuTableData(data) {
        document.getElementById("editPageTitle").textContent = data.textContent.editPage.title;
        document.getElementById("selectImageText").textContent = data.textContent.editPage.selectImageText;
        document.getElementById("searchFileText").textContent = data.textContent.editPage.searchFileText;
        document.getElementById("nameText").textContent = data.textContent.editPage.nameText;
        document.getElementById("priceText").textContent = data.textContent.editPage.priceText;
        document.getElementById("categoryText").textContent = data.textContent.editPage.categoryText;
        document.getElementById("descriptionText").textContent = data.textContent.editPage.descriptionText;
        document.getElementById("saveChangesButton").textContent = data.textContent.editPage.saveChangesButton;

        // También se pueden actualizar los "placeholders"
        document.getElementById("menuItemName").placeholder = data.textContent.editPage.setrNameText;
        document.getElementById("price").placeholder = data.textContent.editPage.setPriceText;
        document.getElementById("categoryDropdown").textContent = data.textContent.editPage.selectCategoryText;
        document.getElementById("menuItemDescription").placeholder = data.textContent.editPage.setDescriptionText;
    }

    function loadNavbarMenuData(data) {
        document.querySelector("#navbarmenu .navbar-brand h1").textContent = data.textContent.navbarMenu.brandName;
        document.querySelector("#current-date").textContent = data.textContent.navbarMenu.currentDate;
        document.querySelector("#navbarmenu .login-button").textContent = data.textContent.navbarMenu.logoutButton;
        document.querySelector("#navbarLogo").src = data.textContent.navbarMenu.logoImage;

    }

    // Cargar los textos y los platos de la operación del menú
    // Cargar los textos y los platos de la operación del menú
    function loadMenuClient(data) {
        // Cargar el título de la página de menú
        document.querySelector("#menuTitle").textContent = data.textContent.menuClient.title;

        // Cargar las cartas de menú
        const menuCardsContainer = document.getElementById("cards");
        menuCardsContainer.innerHTML = '';  // Limpiar las cartas actuales

        // Crear las cartas de menú dinámicamente y distribuirlas en filas
        const cardsPerRow = 3;  // Número de cartas por fila
        let currentRow = document.createElement("div");
        currentRow.classList.add("row", "justify-content-center");

        data.textContent.menuCards.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("col-md-4", "d-flex", "justify-content-center", "mb-4");

            cardElement.innerHTML = `
            <div class="menu-card">
                <img src="${card.image}" alt="Food Image">
                <p class="fw-bold">${card.name}</p>
                <p>${card.price}</p>
                <p class="text-light">${card.availability}</p>
            </div>
        `;

            // Agregar la carta al contenedor de la fila
            currentRow.appendChild(cardElement);

            // Cada vez que se alcanza el número de cartas por fila, agregar la fila al contenedor
            if ((index + 1) % cardsPerRow === 0 || index === data.textContent.menuCards.length - 1) {
                menuCardsContainer.appendChild(currentRow);
                currentRow = document.createElement("div");  // Nueva fila para las próximas cartas
                currentRow.classList.add("row", "justify-content-center");
            }
        });
    }



    // Función general para cargar los datos y textos
    function loadMenuData() {
        fetch('../static/data/menu-data.json')  // Ruta del archivo JSON
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Llamar a las funciones específicas según la página cargada
                if (document.getElementById("data-table")) {
                    loadMenuTableData(data);
                }
                if (document.getElementById("editModal")) {
                    loadEditMenuModalData(data);
                }
                if (document.getElementById("eliminationModal")) {
                    loadEliminationModalData(data);
                }
                if (document.getElementById("edit-table")) {
                    loadEditMenuTableData(data);
                }
                if (document.getElementById("navbarmenu")) {
                    loadNavbarMenuData(data);
                }
                if (document.getElementById("cards")) {
                    loadMenuClient(data);  // Cargar los textos e imágenes de las cartas de menú
                }
            })
            .catch(error => console.error('Error al cargar los datos del menú y textos:', error));
    }

    loadMenuData();  // Llamamos a la función para cargar los datos al cargar la página


});

