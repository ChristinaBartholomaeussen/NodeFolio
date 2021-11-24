import sqlite3 from "sqlite3";
import { open } from "sqlite";

export let connection;

(async() => {
    connection = await open({
        filename: "./mydb.db",
        driver: sqlite3.Database
    });
})()

export async function createConnection() {
    return await open({
        filename: "./mydb.db",
        driver: sqlite3.Database
    });
}
