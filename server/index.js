import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connectDB.js";

dotenv.config();
const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello from appCo!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server started "));
  } catch (error) {
    console.log("error", error);
  }
};

startServer();
