// pages/api/cart.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import dbConnect from "../../../lib/dbconnect";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  try {
    let cart = await Cart.findOne({ user: session.user.id }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({ user: session.user.id, items: [] });
    }

    switch (req.method) {
      case "GET":
        return res.status(200).json(cart);

      case "POST":
        const { productId, quantity = 1 } = req.body;

        // Verify product exists
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        const existingItem = cart.items.find(item =>
          item.product._id.toString() === productId
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        return res.status(200).json(cart);

      case "DELETE":
        const { productId: deleteId } = req.body;

        cart.items = cart.items.filter(item =>
          item.product._id.toString() !== deleteId
        );

        await cart.save();
        return res.status(200).json(cart);

      case "PUT":
        if (req.body.items) { // This is the clear cart request
          cart.items = [];
          await cart.save();
          return res.status(200).json(cart);
        }

        // Existing quantity update logic
        const { productId: updateId, quantity: newQuantity } = req.body;
        const itemToUpdate = cart.items.find(item =>
          item.product._id.toString() === updateId
        );

        if (!itemToUpdate) {
          return res.status(404).json({ error: "Item not found in cart" });
        }

        if (newQuantity < 1) {
          cart.items = cart.items.filter(item =>
            item.product._id.toString() !== updateId
          );
        } else {
          itemToUpdate.quantity = newQuantity;
        }

        await cart.save();
        return res.status(200).json(cart);

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Cart API error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}