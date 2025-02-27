import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "../config/db_config.js";


// Capturar el formulario
const form = document.getElementById("userForm");



// 📌 Función para añadir usuario
async function addUser() {
    const firstName = document.querySelector("input[placeholder='First Name']").value;
    const lastName = document.querySelector("input[placeholder='Last Name']").value;
    const email = document.querySelector("input[placeholder='Email address']").value;
    const phone = document.querySelector("input[placeholder='Phone number']").value;
    const address = document.querySelector("input[placeholder='Street Address']").value;
    const apt = document.querySelector("input[placeholder='Apt #']").value;
    const city = document.querySelector("input[placeholder='City']").value;
    const country = document.querySelector("select").value;
    const zip = document.querySelector("input[placeholder='Zip Code']").value;
    const role = document.querySelector("input[name='role']:checked").id;
    const businessName = document.querySelector("input[placeholder='Business Name']").value;
    const cif = document.querySelector("input[placeholder='CIF']").value;
    const businessDesc = document.querySelector("textarea").value;
    const termsAccepted = document.querySelector("#terms").checked;

    try {
        await addDoc(collection(db, "users"), {
            firstName,
            lastName,
            email,
            phone,
            address,
            apt,
            city,
            country,
            zip,
            role,
            businessName,
            cif,
            businessDesc,
            termsAccepted
        });

        alert("Usuario registrado correctamente.");
        form.reset(); // Limpiar formulario
        obtenerUsuarios(); // Actualizar la lista de usuarios
    } catch (error) {
        console.error("Error al añadir usuario:", error);
    }
}

// 📌 Función para obtener usuarios y mostrarlos en pantalla
async function obtenerUsuarios() {
    const listaUsuarios = document.querySelector("#userList");
    listaUsuarios.innerHTML = ""; // Limpiar lista

    const snapshot = await getDocs(collection(db, "users"));
    snapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `
            ${data.firstName} ${data.lastName} - ${data.email} - ${data.role}
            <button onclick="editarUsuario('${doc.id}', '${data.firstName}', '${data.lastName}', '${data.email}')">Editar</button>
            <button onclick="eliminarUsuario('${doc.id}')">Eliminar</button>
        `;
        listaUsuarios.appendChild(li);
    });
}

// 📌 Función para modificar un usuario
window.editarUsuario = async (id, firstName, lastName, email) => {
    const nuevoNombre = prompt("Nuevo nombre:", firstName);
    const nuevoApellido = prompt("Nuevo apellido:", lastName);
    const nuevoEmail = prompt("Nuevo email:", email);

    if (nuevoNombre && nuevoApellido && nuevoEmail) {
        try {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, {
                firstName: nuevoNombre,
                lastName: nuevoApellido,
                email: nuevoEmail
            });

            alert("Usuario actualizado correctamente.");
            obtenerUsuarios();
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    }
};

// 📌 Función para eliminar un usuario
window.eliminarUsuario = async (id) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
        try {
            await deleteDoc(doc(db, "users", id));
            alert("Usuario eliminado correctamente.");
            obtenerUsuarios();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    }
};

// 📌 Obtener usuarios al cargar la página
document.addEventListener("DOMContentLoaded", obtenerUsuarios);
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#userForm"); // Asegúrate de que el formulario tiene este ID

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita que la página se recargue
        await addUser(); // Llama a la función asíncrona para añadir el usuario
    });
});