document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error("Error cargando el componente:", error));
    }

    loadComponent("navbarmenu", "../templates/fragments/navbaroperationmenu.html");
    loadComponent("data-table", "../templates/fragments/menu-table.html");
    loadComponent("eliminationModal", "../templates/fragments/modals/elimination-modal.html");
    loadComponent("editModal", "../templates/fragments/modals/editmenu-modal.html");
});