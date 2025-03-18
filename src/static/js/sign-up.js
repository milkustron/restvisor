document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error("Error loading component:", error));
    }

    function validarTexto(texto, regex) {
        return regex.test(texto);
    }

    loadComponent("navbarworker", "../templates/fragments/navbarworker.html");

    loadComponent("sign-up-form", "../templates/fragments/sign-up-form.html", function () {
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

        const supervisorRadio = document.getElementById('supervisor');
        const customerRadio = document.getElementById('customer');
        const businessOptionDiv = document.getElementById('business-options');

        function toggleBusinessOption() {
            if (customerRadio.checked) {
                businessOptionDiv.style.display = 'none';
            } else {
                businessOptionDiv.style.display = 'block';
            }
        }

        supervisorRadio.addEventListener('change', toggleBusinessOption);
        customerRadio.addEventListener('change', toggleBusinessOption);

        toggleBusinessOption(); 
    });
});
