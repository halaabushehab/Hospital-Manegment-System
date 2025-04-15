// src/app/api/cart/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "../../lib/config";
import Cart from "../../lib/models/Cart";

// Fetch the cart based on userId
export async function GET(request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    let cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ userId, items: [], totalAmount: 0 });
      await cart.save();
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart", details: error.message }, { status: 500 });
  }
}

// Add a product to the cart
export async function POST(request) {
  try {
    await connectMongoDB();
    const { userId, product } = await request.json();

    if (!userId || !product) {
      return NextResponse.json({ error: "userId and product are required" }, { status: 400 });
    }

    // Validate product fields
    if (!product._id || !product.name || !product.price || !product.image) {
      return NextResponse.json({ error: "Product is missing required fields (_id, name, price, image)" }, { status: 400 });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === product._id);
    if (existingItem) {
      // If the product exists, increase the quantity
      existingItem.quantity += 1;
      existingItem.subtotal = existingItem.price * existingItem.quantity;
    } else {
      // If the product doesn't exist, add it
      cart.items.push({
        productId: new mongoose.Types.ObjectId(product._id), // Convert to ObjectId
        name: product.name,
        price: product.price,
        quantity: 1,
        subtotal: product.price,
        image: product.image,
      });
    }

    // Update the total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + item.subtotal, 0);
    cart.updatedAt = new Date();
    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ error: "Failed to add to cart", details: error.message }, { status: 500 });
  }
}

// Update quantity or remove a product from the cart
export async function PUT(request) {
  try {
    await connectMongoDB();
    const { userId, productId, action } = await request.json();

    if (!userId || !productId || !action) {
      return NextResponse.json({ error: "userId, productId, and action are required" }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Product not found in cart" }, { status: 404 });
    }

    if (action === "increase") {
      cart.items[itemIndex].quantity += 1;
    } else if (action === "decrease") {
      cart.items[itemIndex].quantity -= 1;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1); // Remove the product if quantity is 0
      }
    } else if (action === "remove") {
      cart.items.splice(itemIndex, 1); // Remove the product directly
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Update subtotals and total amount
    if (cart.items[itemIndex]) {
      cart.items[itemIndex].subtotal = cart.items[itemIndex].price * cart.items[itemIndex].quantity;
    }
    cart.totalAmount = cart.items.reduce((total, item) => total + item.subtotal, 0);
    cart.updatedAt = new Date();
    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart", details: error.message }, { status: 500 });
  }
}

// Clear the cart (used after checkout)
export async function DELETE(request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Cart cleared successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ error: "Failed to clear cart", details: error.message }, { status: 500 });
  }
}