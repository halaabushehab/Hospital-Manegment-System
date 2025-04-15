// sehha/src/lib/models/AnimalProduct.js
import mongoose from "mongoose";

const animalProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AnimalProduct || mongoose.model("AnimalProduct", animalProductSchema, "animalproducts");