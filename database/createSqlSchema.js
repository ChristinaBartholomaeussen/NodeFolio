import { createConnection } from "./connectSqlite.js";
import { password } from "../encryption.js";

(async () => {
    const connection = await createConnection();

    await connection.exec("DROP TABLE IF EXISTS projects");
    await connection.exec("DROP TABLE IF EXISTS admins");

    const adminsTableScheme =
        `CREATE TABLE admins(
        admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT NOT NULL,
        password TEXT NOT NULL
        )`;

    const projectsTableSchema =
        `CREATE TABLE projects(
            project_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            technologies TEXT NOT NULL,
            description TEXT,
            link TEXT NOT NULL)`;

    const adminInfo = `INSERT INTO admins (user, password) VALUES ('christina', '${password}')`;

    const projectInfo = `INSERT INTO projects (title, technologies, description, link) 
    VALUES 
    ('ChristiansØ', 'C#, HTML, JavaScript, CSS', '4. Semester eksamensprojekt', 'https://github.com/ChristinaBartholomaeussen/christiansoe_projekt'),
    ('NodeJs - Mandatory1', 'HTML, CSS, JavaScript', '', 'https://github.com/ChristinaBartholomaeussen/NodeJs_Mandatory1'),
    ('Folkeskoler', 'C#', 'Indlæs folkeskoler fra excel-fil', 'https://github.com/ChristinaBartholomaeussen/Folkeskoler'),
    ('Postnumre', 'C#', 'Find by ud fra postnummer i csv', 'https://github.com/ChristinaBartholomaeussen/Postnumre'),
    ('Eksamens2021Projekt - 3. semester', 'Java, JavaScript, HTML, CSS', '24 timers eksamensprojekt 2021 - programmering', 'https://github.com/ChristinaBartholomaeussen/Eksamen2021Projekt');
    `

    await connection.exec(projectsTableSchema);
    await connection.exec(adminsTableScheme);
    await connection.run(adminInfo);
    await connection.run(projectInfo);
})()

