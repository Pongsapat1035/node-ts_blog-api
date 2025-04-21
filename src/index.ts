import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { z } from "zod";
import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcrypt";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = 8080;

const db = new pg.Client({
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432,
  database: process.env.DB_NAME,
});

app.use(bodyParser.json());

db.connect();

const registerData = z.object({
  email: z.string().min(1, "Email cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
  name: z.string().min(1, "Name cannot be empty"),
});

app.get("/", (req, res) => {
  res.json({ message: "okoo" });
});

app.get("/test", async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});



app.listen(port, () => {
  console.log(`Server run on portd : ${port}`);
});
