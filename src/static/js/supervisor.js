document.addEventListener("DOMContentLoaded", async function () {
    try {
        const config = await loadJSON("../static/database.json");

        await Promise.all(config.fragments.map(frag => loadComponent(frag.id, frag.url)));

        console.log("Todos los fragmentos se han cargado correctamente.");

        const data = await loadJSON("../static/database.json");

        loadPageContent(data);
        loadReservations(data);
        loadSidebar(data);
        loadConfirmationModal(data);
        loadCancellationModal(data);
        loadAddReservationModal(data);

        setupReservationForm();

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
        "restaurant-name": data.sitio.nombre_restaurante,
        "position": data.sitio.posicion,
        "date": data.sitio.fecha,
        "hour": data.sitio.dia,
        "reservations-title": data.sitio.titulo_reservas
    };

    Object.entries(elements).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    });

    console.log("Datos JSON cargados correctamente.");
}

function loadReservations(data) {
    const reservationsBody = document.getElementById("reservations-body");
    if (!reservationsBody) {
        console.warn("No se encontró el contenedor de reservas.");
        return;
    }

    reservationsBody.innerHTML = "";
    data.reservations.forEach(reservation => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${reservation.name}</td>
            <td>${reservation.phone}</td>
            <td>${reservation.time}</td>
            <td>${reservation.guests}</td>
            <td>${reservation.state}</td>
            <td>
                <button class="btn confirm-btn" data-bs-toggle="modal" data-bs-target="#confirmationModal">✔</button>
                <button class="btn confirm-btn" data-bs-toggle="modal" data-bs-target="#cancellationModal">✘</button>
            </td>
        `;
        reservationsBody.appendChild(row);
    });

    console.log("Reservas cargadas correctamente.");
}

function loadSidebar(data) {
    document.getElementById("workers-title").textContent = data.sidebar.titulo;

    const workersList = document.getElementById("workers-list");
    workersList.innerHTML = "";

    data.sidebar.workers.forEach(worker => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span class="dot ${worker.status}"></span> ${worker.name}`;
        workersList.appendChild(listItem);
    });

    console.log("Trabajadores activos cargados correctamente.");
}

function loadConfirmationModal(data) {
    if (!document.getElementById("confirmation-modal-title")) {
        console.warn("El modal de confirmación no está presente en el DOM.");
        return;
    }

    document.getElementById("confirmation-modal-title").textContent = data.modals.confirmation.title;
    document.getElementById("confirmation-modal-message").textContent = data.modals.confirmation.message;
    document.getElementById("confirmation-modal-no").textContent = data.modals.confirmation.buttons.no;
    document.getElementById("confirmation-modal-yes").textContent = data.modals.confirmation.buttons.yes;

    console.log("Modal de confirmación cargado correctamente.");
}

function loadCancellationModal(data) {
    if (!document.getElementById("cancellation-modal-title")) {
        console.warn("El modal de cancelación no está presente en el DOM.");
        return;
    }

    document.getElementById("cancellation-modal-title").textContent = data.modals.cancellation.title;
    document.getElementById("cancellation-modal-message").textContent = data.modals.cancellation.message;
    document.getElementById("cancellation-modal-no").textContent = data.modals.cancellation.buttons.no;
    document.getElementById("cancellation-modal-yes").textContent = data.modals.cancellation.buttons.yes;

    console.log("Modal de cancelación cargado correctamente.");
}

function loadAddReservationModal(data) {
    if (!document.getElementById("add-reservation-modal-title")) {
        console.warn("El modal de nueva reserva no está presente en el DOM.");
        return;
    }

    document.getElementById("add-reservation-modal-title").textContent = data.modals.addReservation.title;
    document.getElementById("label-name").textContent = data.modals.addReservation.labels.name;
    document.getElementById("label-date").textContent = data.modals.addReservation.labels.date;
    document.getElementById("label-phone").textContent = data.modals.addReservation.labels.phone;
    document.getElementById("label-number").textContent = data.modals.addReservation.labels.number;
    document.getElementById("add-reservation-button").textContent = data.modals.addReservation.buttons.add;

    console.log("Modal de añadir reserva cargado correctamente.");
}

function setupReservationForm() {
    const form = document.getElementById("reservation-form");
    const addButton = document.getElementById("add-reservation-button");

    if (!form || !addButton) {
        console.warn("El formulario o el botón de añadir reserva no están disponibles aún.");
        return;
    }

    addButton.addEventListener("click", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add("was-validated");
        } else {
            alert("Reservation successfully added!");
        }
    });

    console.log("Eventos de validación de formulario agregados correctamente.");
}