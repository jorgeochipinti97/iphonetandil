"use client";
import { updatePoints } from "@/utils/utils";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";


const Page = () => {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState();
  //?orderID=660effc12c2b1665f2fec3a0&collection_id=75600689512&collection_status=approved&payment_id=75600689512&status=approved&external_reference=null&payment_type=account_money&merchant_order_id=17306289685&preference_id=743465031-d887ba61-b9f3-45fc-8c6e-98d30a7645bb&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
  const getOrder = async (_id) => {
    const response = await axios.get("/api/orders");
    const orders = response.data.filter((e) => e._id == _id);
    setOrder(orders[0]);
  };

  const updateTransaction = async (_id, status, paymentId) => {
    const response = await axios.put("/api/orders", {
      _id: _id,
      transactionId: paymentId,
      status: status,
      provider: "mercadopago",
    });
    response && await updatePoints(user,3)
  };

  useEffect(() => {
    const mpPaymentId = searchParams.get("payment_id");
    const mpStatus = searchParams.get("collection_status");
    const orderId = searchParams.get("orderID");

    if (orderId) {
      getOrder(orderId);

      if (mpPaymentId && mpStatus) {
        updateTransaction(orderId, mpStatus, mpPaymentId);
      }
    }
  }, [searchParams]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex justify-center">
      <img src="/logo.png" className="w-6/12"/>
      </div>
      <p className="font-geist font-bold tracking-tighter text-center text-xl md:text-4xl">¡Muchas gracias por tu compra!</p>
      <p className="font-geist font-bold tracking-tighter text-center text-xl md:text-4xl">Aqui puedes descargar </p>
      {order && <a className="bg-violet-500 p-3 rounded-xl mt-10 text-white shadowLow" href={`${order.fileUrl}`}>Descargar</a>}
    </div>
  );
};

export default Page;
