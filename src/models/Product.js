// models/Product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    category: {
      type: String,
      required: true,
      enum: ["All", "Men", "Women", "Kids", "Makeup", "Accessories"], // From constants
    },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }, // Image URL
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
