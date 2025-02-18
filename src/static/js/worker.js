document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error("Error loading component:", error));
    }

    loadComponent("navbar", "../templates/fragments/navbar.html");
    loadComponent("sidebar", "../templates/fragments/sidebar.html");
    loadComponent("shifts-table", "../templates/fragments/shifts-table.html");
    loadComponent("worker-schedule", "../templates/fragments/worker-schedule.html");
});