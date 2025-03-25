document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error("Error loading component:", error));
    }

    loadComponent("navbarMain", "../templates/fragments/navbar-main.html");
    loadComponent("loginModalbutton", "../templates/fragments/modals/login-modal.html");

    fetch("../static/database.json")
        .then(response => response.json())
        .then(jsonData => {
            const contentsArray = jsonData.contents;

            if (!Array.isArray(contentsArray)) return;

            contentsArray.forEach(item => {
                switch (item.name) {
                    case "main view title":
                        document.getElementById("mainViewTitle").innerText = item.content;
                        break;
                    case "main view description":

                        document.getElementById("mainViewDescription").innerText = item.content;
                        break;
                    case "main view call to action":
                        document.getElementById("mainViewCallToAction").innerText = item.content;
                        break;
                    default:
                        break;
                }
            });

            const imagesArray = jsonData.images || [];
        
            imagesArray.forEach(item => {
            switch (item.name) {
                case "supervisor-mockup":
                    document.getElementById("supervisorMockup").src = item.image;
                    break;
                case "worker-mockup":
                    document.getElementById("workerMockup").src = item.image;
                    break;
            }
            });
            
            const buttonsArray = jsonData.buttons || [];
            buttonsArray.forEach(item => {
                if (item.category === "sign_up") {
                    document.getElementById("signUpButton").innerText = item.content;
                }
            });
        })
        .catch(error => console.error("Error loading JSON file:", error));
});
