// src/lib/models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "AnimalProduct", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      subtotal: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  totalAmount: { type: Number, required: true, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;