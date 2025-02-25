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
    loadComponent("addNewModal", "../templates/fragments/modals/add_new_modal.html"); //se abrira cuando haga click en un boton
});