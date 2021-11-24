const projectsWrapperDiv = document.getElementById("projects-wrapper");
document.getElementById("create").addEventListener("click", () => {
    location.href = "/admin/project";
});
fetch("/projects/api")
    .then(response => response.json())
    .then(({ projects }) => {
        projects.map(project => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add('project-div');
            projectDiv.id = project["project_id"];
            projectDiv.innerHTML = `
            <hr>
            <div class="row"> 
            <div class="col-6" style="display: inline-grid">
            <label for="${escapeHTML(project["title"])}">Title:</label>  
            <br>
            <label for"${escapeHTML(project["technologies"])}">Technologies:</label>
            <br>
            <label for="${escapeHTML(project["description"])}">Decription:</label>
            <br>
            <label for="${escapeHTML(project["link"])}">Link:</label>
            </div> 
            <div class="col-6" style="display: inline-grid">
            <input id="${escapeHTML(project["title"])}" disabled="true" value="${escapeHTML(project["title"])}">
            <br>
            <input id="${escapeHTML(project["technologies"])}" disabled="true" value="${escapeHTML(project["technologies"])}">
            <br>
            <input id="${escapeHTML(project["description"])}" disabled="true" value="${escapeHTML(project["description"])}">
            <br>
            <input id="${escapeHTML(project["link"])}" disabled="true" value="${escapeHTML(project["link"])}">
            </div>
            </div>`;
            const btnDelete = document.createElement("button");
            btnDelete.classList.add("btn");
            btnDelete.classList.add("btn-danger");
            btnDelete.id = "delete" + project["project_id"];
            btnDelete.style = "margin-right: 20px; margin-top: 10px;";
            btnDelete.innerHTML = "Delete";
            btnDelete.onclick = async function () {
                deleteProject(project["project_id"], projectDiv);
            };
            projectDiv.appendChild(btnDelete);
            const btnEdit = document.createElement("button");
            btnEdit.classList.add("btn");
            btnEdit.classList.add("btn-warning");
            btnEdit.disabled = false;
            btnEdit.id = "edit" + project["project_id"];
            btnEdit.style = "margin-right: 20px; margin-top: 10px;";
            btnEdit.innerHTML = "Edit";
            btnEdit.onclick = async function () {
                const divId = document.getElementById(project["project_id"]);
                const tags = divId.getElementsByTagName("input");
                for (let i = 0; i < tags.length; i++) {
                    tags[i].disabled = false;
                }
                btnSave.disabled = false;
                btnEdit.disabled = true;
                btnDelete.disabled = true;
            };
            projectDiv.appendChild(btnEdit);
            const btnSave = document.createElement("button");
            btnSave.classList.add("btn");
            btnSave.classList.add("btn-success");
            btnSave.id = "save" + project["project_id"];
            btnSave.disabled = true;
            btnSave.style = "margin-right: 20px; margin-top: 10px;";
            btnSave.innerHTML = "Save";
            btnSave.onclick = async function () {
                saveProject(project["project_id"], project["title"],
                    project["technologies"], project["description"], project["link"], btnDelete.id, btnSave.id, btnEdit.id);
            };
            projectDiv.appendChild(btnSave);
            projectsWrapperDiv.appendChild(projectDiv);
        });
    });
function saveProject(projectId, pTitle, pTechnologies, pDescription, pLink, btnDeleteId, btnSaveId, btnEditId) {
    fetch(`/projects/api/${projectId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            title: document.getElementById(pTitle).value,
            technologies: document.getElementById(pTechnologies).value,
            link: document.getElementById(pLink).value,
            description: document.getElementById(pDescription).value
        })
    }).then(response => {
        if (response.status === 200) {
            toastr["success"]("Opdatering gemt");
            document.getElementById(btnEditId).disabled = false;
            document.getElementById(btnSaveId).disabled = true;
            document.getElementById(btnDeleteId).disabled = false;
            const divId = document.getElementById(projectId);
            const tags = divId.getElementsByTagName("input");
            for (let i = 0; i < tags.length; i++) {
                tags[i].disabled = true;
            }
        };
    });
}
function deleteProject(projectId, divToDelete) {
    fetch(`/projects/api/${projectId}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => {
        if (response.status === 200) {
            toastr["success"]("Projektet er slettet");
            setTimeout(() => projectsWrapperDiv.removeChild(divToDelete), 2000);
        }
    });
}
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "4000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}