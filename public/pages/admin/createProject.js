function createProject() {

    fetch("/projects/api", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            title: document.getElementById("title").value,
            technologies: document.getElementById("technologies").value,
            description: document.getElementById("description").value,
            link: document.getElementById("link").value
        })
    }).then(response => {
        if (response.status === 201) {
            toastr["success"]("Projektet er oprettet.");
            setTimeout(() => location.href = "/admin", 2000);
        }
        else {
            toastr["warning"]("Du mangler noget.");
        }
    });
}
document.getElementById("create-button").addEventListener("click", createProject);