import dotenv from "dotenv";
import path from "path";
import pg from "pg";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const db = new pg.Client({
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432,
  database: process.env.DB_NAME,
});

db.connect();

export default db