fetch("/projects/api")
    .then(response => response.json())
    .then(({ projects }) => {
        const projectsWrapperDiv = document.getElementById("projects-wrapper");
        projects.map(project => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add('project-div');
            projectDiv.innerHTML = `
            <hr>
            <h4>Title: ${escapeHTML(project["title"])}</h4>
            <p>Technologies: ${escapeHTML(project["technologies"])}</p>
            <p>Decription: ${escapeHTML(project["description"])}</p>
            <p>Link: <a class="link" href="${project["link"]}"> ${project["link"]}</a></p>
            `;
            projectsWrapperDiv.appendChild(projectDiv);
        });
    });