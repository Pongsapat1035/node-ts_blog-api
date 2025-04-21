import dotenv from "dotenv";
import path from "path";
import app from "./app"

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server run on portd : ${port}`);
});
