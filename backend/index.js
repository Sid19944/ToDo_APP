import app from "./app.js";
import dotenv from "dotenv";
dotenv.config("./.env");
import { dbconnect } from "./src/database/db.connect.js";

const PORT = process.env.PORT;

dbconnect()
  .then(() => {
    console.log("Data Base Connected Successfully");
    app.listen(PORT, () => {
      console.log("App is listing on PORT", PORT);
    });
  })
  .catch((err) => {
    console.log("Something wrong while connecting with the DB,", err);
  });
