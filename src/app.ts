import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route"
import blogRoute from "./routes/blog.route"
const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoute); 
app.use("/blog",blogRoute)

export default app;