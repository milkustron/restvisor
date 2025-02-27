// document.addEventListener("DOMContentLoaded", function () {
//     function loadComponent(id, url) {
//         fetch(url)
//             .then(response => response.text())
//             .then(data => {
//                 document.getElementById(id).innerHTML = data;
//             })
//             .catch(error => console.error("Error loading component:", error));
//     }


//     loadComponent("navbarMain", "../templates/fragments/navbar-main.html");
//     loadComponent("loginModalbutton", "../templates/fragments/modals/login-modal.html");
//     });
document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url) {
        const element = document.getElementById(id);
        if (element) {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    element.innerHTML = data;
                })
                .catch(error => console.error("Error loading component:", error));
        } else {
            console.error(`Element with id "${id}" not found.`);
        }
    }

    loadComponent("navbarMain", "../templates/fragments/navbar-main.html");
    loadComponent("loginModalbutton", "../templates/fragments/modals/login-modal.html");
});
