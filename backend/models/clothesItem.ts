import mongoose from "mongoose";

const clothesItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  fit: { type: String, enum: ["men", "women", "kids"], required: true },
  category: {
    type: String,
    enum: ["t-shirt", "hoodie", "shorts", "shirt", "pants"],
    required: true,
  },
  color: { type: String, required: true },
  description: { type: String, required: true },
  size: {
    type: String,
    enum: ["xs", "s", "m", "l", "xl", "xxl"],
    required: true,
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

//Export the model
export default mongoose.model("ClothesItem", clothesItemSchema, "clothesItems");
