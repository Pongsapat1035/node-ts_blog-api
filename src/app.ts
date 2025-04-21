import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route"
const app = express();

app.use(bodyParser.json());
app.use("/auth", authRoute); // Will respond to /api/hello

export default app;