import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        _id: { type: String },
        title: { type: String },
        quantity: { type: Number },
        images: [{ type: String }],
        price: { type: Number },
      },
    ],
    numberOfItems: { type: Number },
    total: { type: Number, required: true },
    transactionId: { type: String },
    discountCode: { type: String },
    name: { type: String },
    email: { type: String },
    address: { type: String },
    numberOfAddress: { type: String },
    ciudad: { type: String },
    cuotas: { type: String },
    provincia: { type: String },
    phone: { type: String },
    piso: { type: String },
    city: { type: String },
    estado: { type: String, default: "acreditado" },
    dniTitular: { type: String },
    discountPrice: { type: Number, default: 0 },
    tracking: { type: String },
    zipCode: { type: String },
    codGestion: { type: String },
    token: { type: String },
    postalCode: { type: String },
    paid: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
