
// pages/api/productos/index.js

import { connectDB } from "@/lib/db";
import Order from "@/models/order";



export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "GET":
      try {
        const productos = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: productos });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      try {
        const producto = new Order(req.body);
        await producto.save();
        res.status(201).json({ success: true, data: producto });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const { _id, ...data } = req.body;

        const producto = await Order.findByIdAndUpdate(_id, data, {
          new: true,
        });

        // Verifica que el producto fue encontrado y actualizado antes de intentar enviarlo
        if (!producto) {
          return res
            .status(404)
            .json({ success: false, error: "Producto no encontrado." });
        }

        // Ahora es seguro enviar el producto actualizado como respuesta
        res.status(200).json({ success: true, data: producto });
      } catch (error) {
        console.error(error);
        res
          .status(400)
          .json({ success: false, error: "Error al actualizar el producto." });
      }
      break;
    default:
      res.status(405).json({ success: false, error: "Método no permitido" });
      break;
  }
}
