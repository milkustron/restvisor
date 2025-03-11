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

    function loadWorkersData() {
        fetch('../static/database.json')  
            .then(response => response.json())
            .then(data => {
                console.log("Datos de trabajadores:", data);
                renderShiftsTable(data);  
            })
            .catch(error => console.error("Error loading workers data:", error));
    }

    
    loadWorkersData();

    
    function renderShiftsTable(data) {
        const table = document.getElementById('shifts-table');
        const tbody = table.querySelector('tbody');
        
        tbody.innerHTML = ''; 
        const worker = data.workers.find(worker => worker.id === 1);

        if (worker) {
            worker.worker_hours.forEach(shift => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${shift.date}</td>
                    <td>${shift.start}</td>
                    <td>${shift.finish}</td>
                    <td>${shift.total_amount}</td>
                `;
                tbody.appendChild(row);
            });
        } else {
            console.log("Trabajador no encontrado");
        }
    }
});

function changeText() {
    let button = document.getElementById("clockInButton");
    button.textContent = button.textContent === "Clock-In" ? "Clock-Out" : "Clock-In";
}
