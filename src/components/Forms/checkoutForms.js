"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { calcularComisionMercadoPago, formatPrice } from "@/lib/utils";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

export const CheckoutForm = ({ total, products }) => {
  const { push } = useRouter();
  const { register, handleSubmit } = useForm();
  const [orderData, setOrderdata] = useState({});
  const [disabledisCheckout, setDisabledIscheckout] = useState(false);
  const mensaje = `Hola! recien compre estos productos ${products.map(
    (e) => `${e.title}`
  )}  por mercadopago, `;

  const mensajepending = `Hola! recien intente comprar estos productos ${products.map(
    (e) => `${e.title}`
  )}  por mercadopago, y algo salió mal `;

  const mensajeUrlEncoded_ = encodeURIComponent(mensaje);
  const enlaceWaLink_ = `https://wa.me/5492484650674?text=${mensajeUrlEncoded_}`;
  const enlaceWaLink_pending = `https://wa.me/5492484650674?text=${mensajepending}`;
  const { toast } = useToast();
  useEffect(() => {
    try {
      initMercadoPago("APP_USR-7e534fec-3b2d-422d-a37c-5cc48a2858f5");
    } catch (error) {
      console.error("Error al inicializar MercadoPago", error);
    }
  }, []);

  const items = products.map((product) => ({
    title: product.title, // Nombre del producto
    quantity: product.quantity, // Cantidad fijada a 1 en este ejemplo
    unit_price: calcularComisionMercadoPago(product.price), // Aplica la comisión de MercadoPago
  }));

  const getPayment = async () => {
    try {
      const preference = {
        items: items,
        back_urls: {
          success: enlaceWaLink_, // URL de éxito
          failure: mensajepending, // URL de fallo
          pending: enlaceWaLink_pending, // URL pendiente
        },
      };

      const data = await axios.post(
        "https://api.mercadopago.com/checkout/preferences",
        preference,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer APP_USR-5679506262140831-060512-72fcf387705db0cb742083ceb3389b1b-260055842`, // Usa el Access Token del usuario
          },
        }
      );

      if (data) {
await axios.post('/api/orders',orderData)
        push(data.data.init_point);
      }
    } catch (err) {
      console.log(err); // Maneja cualquier error que ocurra durante la petición
    }
  };
  const onSubmit = async (data) => {
    const orderDate = {
      ...data,
      total: total,
    };
    setOrderdata(orderDate);
    toast({
      title: "Datos cargados correctamente",
      description: "Gracias por confiar en Importandil",
    });
    setDisabledIscheckout(true);
  };
  return (
    <div className="">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Pagar ahora</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Completa los datos para continuar</DialogTitle>
              <DialogDescription>
                <form
                  className="mx-2 formPurchase"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="my-2">
                    <Label className="text-black font-bold">
                      Nombre Completo
                    </Label>
                    <Input
                      {...register("name", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="my-2">
                    <Label className="text-black font-bold">Email</Label>
                    <Input
                      {...register("email", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="my-2">
                    <Label className="text-black font-bold">Celular</Label>
                    <Input
                      {...register("phone", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="my-2">
                    <Label className="text-black font-bold">Dirección</Label>
                    <Input
                      {...register("address", {
                        required: true,
                      })}
                    />
                  </div>

                  <Button type="submit" className="mt-5 hover:animate-tilt">
                    Enviar
                  </Button>
                </form>
                <p className="font-bold mt-5">Total: {formatPrice(total)}</p>
                <Button
                  variant="outline"
                  className="w-fit py-2 mt-5"
                  disabled={!disabledisCheckout}
                  onClick={getPayment}
                >
                  <img src="/merca.png" className="w-[25px] m-2" />
                  Pagar con MercadoPago
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
