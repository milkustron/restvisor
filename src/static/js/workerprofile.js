document.addEventListener("DOMContentLoaded", async function () {
    try {
        const data = await loadJSON("../static/database.json");

        await Promise.all([
            loadComponent("navbarworker", "../templates/fragments/navbarworker.html"),
            loadComponent("shifts-table", "../templates/fragments/shifts-table.html"),
            loadComponent("worker-schedule", "../templates/fragments/worker-schedule.html")
        ]);

        console.log("Todos los fragmentos se han cargado correctamente.");

        loadPageContent(data);

        renderShiftsTable(data);

        renderWorkerSchedule(data);

    } catch (error) {
        console.error("Error durante la carga de la página:", error);
    }
});

async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error en ${url}: ${response.status}`);
        document.getElementById(id).innerHTML = await response.text();
    } catch (error) {
        console.error(`Error cargando el componente ${id}:`, error);
    }
}

async function loadJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error en JSON: ${response.status}`);
    return response.json();
}

function loadPageContent(data) {
    const elements = {
        "date": data.sitio.fecha,
        "weekDay": data.sitio.dia,
        "RestVisor": data.sitio.nombre_restaurante
    };

    Object.entries(elements).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    });

    const workerData = data.users.find(w => w.id === 1);

    if (workerData) {
        const workerElements = {
            "name": workerData.first_name,
            "email": workerData.email
        }

        Object.entries(workerElements).forEach(([id, text]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        });

    }

    console.log("Datos JSON cargados correctamente.");
}

function renderShiftsTable(data) {
    const table = document.getElementById('shifts-table');
    const tbody = table.querySelector('tbody');
    
    tbody.innerHTML = '';
    // Tomamos el trabajador con id = 1 como ejemplo
    const worker = data.workers.find(w => w.id === 1);

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

function renderWorkerSchedule(data) {
    const scheduleContainer = document.getElementById("worker-schedule");
    if (!scheduleContainer) return;

    let scheduleHTML = `<h2 class="text-center text-dark">Worker Schedule</h2>`;
    scheduleHTML += `<br>`;

    data.worker_schedule.forEach(item => {
        scheduleHTML += `<h2 class="text-center text-dark">${item.day}: ${item.start}-${item.finish}</h2>`;
        scheduleHTML += `<br>`;
    });

    scheduleContainer.innerHTML = scheduleHTML;
}

function changeText() {
    let button = document.getElementById("clockInButton");
    button.textContent = button.textContent === "Clock-In" ? "Clock-Out" : "Clock-In";
}