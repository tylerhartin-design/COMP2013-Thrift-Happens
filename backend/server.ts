//Backend server for Thrift Happens online shop
//imports
import express, { type Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import ClothesItem from "./models/clothesItem";

//Constants Variables
const server: Express = express();
const PORT: number = 3000;
const { MONGO_URI } = process.env;

//Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

//Connect to DB and start the server
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not found in the environment variables");
}
mongoose
  .connect(MONGO_URI)
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Connected to DB\nServer is running on port ${PORT}`),
    ),
  )
  .catch((error) => console.log(error));

//Routes
//Root route
server.get("/", (request, response) => {
  response.send("Server Is live");
});

//GET data API route
server.get("/data", async (request, response) => {
  try {
    const data = await ClothesItem.find();
    response.status(200).send(data);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});
