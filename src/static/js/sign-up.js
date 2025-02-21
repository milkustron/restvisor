document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error("Error loading component:", error));
    }

    loadComponent("navbarworker", "../templates/fragments/navbarworker.html");
    loadComponent("sign-up-form", "../templates/fragments/sign-up-form.html");
    loadComponent("shifts-table", "../templates/fragments/shifts-table.html");
    loadComponent("worker-schedule", "../templates/fragments/worker-schedule.html");
});