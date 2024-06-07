import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [{ type: String }],
  images: [{ type: String, required: true }],
  slug: { type: String },
  isUSD: { type: Boolean },
  description: { type: String },
  price: { type: Number },
  discountPrice: { type: Number },
  clientPrice: { type: Number },
  category: { type: String, required: true },
  subcategory: { type: String },
  productosRelacionados: [{ type: String }],
  tracking: { type: String },
  sku: { type: String },
  stock: { type: Number },
  sizes: [
    {
      size: { type: String },
      stock: { type: Number, default: 0 },
    },
  ],
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
