document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                if (callback) callback(); // Llamamos al callback después de cargar el componente
            })
            .catch(error => console.error("Error loading component:", error));
    }

    function validarTexto(texto, regex) {
        return regex.test(texto);
    }

    loadComponent("navbarworker", "../templates/fragments/navbarworker.html");

    loadComponent("sign-up-form", "../templates/fragments/sign-up-form.html", function () {
        // Ahora que el formulario se ha cargado, podemos obtener los elementos
        const password = document.getElementById("password");
        const zipcode = document.getElementById("zip");

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
        const postalCodeRegex = /^\d{5}$/;

        password.addEventListener("input", function () {
            if (!validarTexto(password.value, passwordRegex)) {
                password.setCustomValidity("La contraseña debe tener al menos 8 caracteres, incluyendo 1 letra, 1 número y 1 carácter especial");
            } else {
                password.setCustomValidity("");
            }
        });

        zipcode.addEventListener("input", function () {
            if (!validarTexto(zipcode.value, postalCodeRegex)) {
                zipcode.setCustomValidity("El código postal debe tener exactamente 5 dígitos.");
            } else {
                zipcode.setCustomValidity("");
            }
        });
    });
});
