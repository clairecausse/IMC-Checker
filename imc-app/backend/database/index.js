import Database from "better-sqlite3";
import fs from "fs";

const db = new Database("db.sqlite");

const schema = fs.readFileSync("./database/schema.sql", "utf8");
db.exec(schema);

export default db;
