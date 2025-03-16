document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Cargamos la configuración/JSON de la página
        const data = await loadJSON("../static/database.json");

        // Cargamos los componentes de forma concurrente
        await Promise.all([
            loadComponent("navbarworker", "../templates/fragments/navbarworker.html"),
            loadComponent("shifts-table", "../templates/fragments/shifts-table-clock-in.html"),
            loadComponent("worker-schedule", "../templates/fragments/worker-schedule.html")
        ]);

        console.log("Todos los fragmentos se han cargado correctamente.");

        // Cargamos el contenido de la página (incluyendo date y hour)
        loadPageContent(data);

        // Renderizamos la tabla de turnos para el trabajador con id 1
        renderShiftsTable(data);
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
    };

    Object.entries(elements).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    });

    console.log("Datos JSON cargados correctamente.");
}

function renderShiftsTable(data) {
    const table = document.getElementById('shifts-table');
    const tbody = table.querySelector('tbody');

    tbody.innerHTML = '';
    // Se asume que se renderiza la información del trabajador con id 1
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

function changeText() {
    const button = document.getElementById("clockInButton");
    button.textContent = button.textContent === "Clock-In" ? "Clock-Out" : "Clock-In";
}
