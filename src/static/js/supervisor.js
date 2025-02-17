document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error("Error loading component:", error));
    }

    loadComponent("navbar", "../templates/navbar.html");
    loadComponent("sidebar", "../templates/sidebar.html");
    loadComponent("reservations", "../templates/reservations.html");
    loadComponent("confirmation-dialog", "../templates/confirmation-dialog.html");
});