import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import useCartStore from "@/hooks/useCartStore";

export const CardProduct = ({ product }) => {
  const mensaje = `Hola! Estoy interesado en  ${product.title}   `;
  const { push } = useRouter();
  const mensajeUrlEncoded_ = encodeURIComponent(mensaje);
  const enlaceWaLink_ = `https://wa.me/5492484650674?text=${mensajeUrlEncoded_}`;
  const agregarProducto = useCartStore((state) => state.agregarProducto);
  const { toast } = useToast();
  return (
    <div className="mx-5 z-40 w-fit flex justify-center my-5 md:my-0">
      {product && (
        <Card className=" p-5 max-w-[400px]" >
          <CardTitle className="text-center text-md mb-5 mx-2">{product.title}</CardTitle>
          <CardContent>
            <div className="flex justify-center">
            <img src={product.images[0]} alt="" className="rounded-xl w-10/12" />
            </div>
            <p className="font-geist tracking-tighter font-light mt-5">
              {product.description}
            </p>
            <div className="flex justify-start items-center">
              {product.category != "iphone" && (
                <p className="font-geist my-5 font-bold text-2xl">
                  {formatPrice(product.price)}
                </p>
              )}
            </div>
            {product.category == "iphone" ? (
              <Button onClick={() => push(enlaceWaLink_)}>Comprar ahora</Button>
            ) : (
              <div>
                <div>
                  <Button
                    className="text-md font-geist tracking-tighter"
                    onClick={() => {
                      agregarProducto({
                        title: product.title,
                        price: product.price,
                        images: product.images,
                        _id: product._id,
                      });
                      toast({
                        title: "Producto agregado correctamente",
                        description: "Gracias por confiar en Importandil",
                      });
                    }}
                  >
                    <svg
                      width={25}
                      className="mr-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="#f5f5f7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6.3 5H21l-2 7H7.377M20 16H8L6 3H3m6 17a1 1 0 11-2 0 1 1 0 012 0zm11 0a1 1 0 11-2 0 1 1 0 012 0z"
                      ></path>
                    </svg>
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
