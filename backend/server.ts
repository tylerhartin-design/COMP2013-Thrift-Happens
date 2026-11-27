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
    console.log(error);
    response.status(500).send(error);
  }
});

//POST Route to add new clothes item to the DB
server.post("/data", async (request, response) => {
  const {
    id,
    name,
    image,
    fit,
    category,
    color,
    description,
    size,
    price,
    quantity,
    itemQuantity,
  } = request.body;
  const newArticle = new ClothesItem({
    id,
    name,
    image,
    fit,
    category,
    color,
    description,
    size,
    price,
    quantity,
    itemQuantity,
  });
  try {
    await newArticle.save();
    response.status(201).send({
      message: `New Item with id ${id} added successfully`,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

//DELETE route to delete one clothes article by id
server.delete("/data/:id", async (request, response) => {
  const id = Number(request.params.id); //Because param will convert to string, we need to convert it back to number to match the type in the DB
  try {
    await ClothesItem.findOneAndDelete({ id });
    response
      .status(201)
      .send({ message: `Item with id ${id} deleted successfully` });
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

//PATCH route to update one clothes article by id
server.patch("/data/:id", async (request, response) => {
  const id = Number(request.params.id);
  const clothesArticle = request.body;
  try {
    await ClothesItem.findOneAndUpdate({ id }, { ...clothesArticle });
    response
      .status(201)
      .send({ message: `Item with id ${id} updated successfully` });
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});
