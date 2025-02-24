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
    loadComponent("shifts-table", "../templates/fragments/shifts-table-clock-in.html");
    loadComponent("worker-schedule", "../templates/fragments/worker-schedule.html");
});

function changeText() {
    let button = document.getElementById("clockInButton");
    button.textContent = button.textContent === "Clock-In" ? "Clock-Out" : "Clock-In";
}