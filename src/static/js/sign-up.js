document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error("Error loading component:", error));
    }

    function validarTexto(texto, regex) {
        return regex.test(texto);
    }

    loadComponent("navbarworker", "../templates/fragments/navbarworker.html");
    loadComponent("sign-up-form", "../templates/fragments/sign-up-form.html");

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    const postalCodeRegex = /^\d{5}$/;
    
    const password = document.getElementById("password").value;
    const zipcode = document.getElementById("zip").value;

    password.addEventListener("input", function (evt) {
        if(!validarTexto(password, passwordRegex)) {
            password.setCustomValidity("La contraseña debe tener al menos 8 caracteres, incluyendo 1 letra, 1 número y 1 carácter especial");
        } else {
            password.setCustomValidity("");
        }
    });

    zipcode.addEventListener("input", function (evt) {
        if(!validarTexto(zipcode, postalCodeRegex)) {
            password.setCustomValidity("El código postal debe tener exactamente 5 dígitos.");
        } else {
            password.setCustomValidity("");
        }
    });
});