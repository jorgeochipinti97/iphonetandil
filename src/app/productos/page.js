"use client";
import { CardProduct } from "@/components/Cards/CardProduct";
import { Button } from "@/components/ui/button";
import useProducts from "@/hooks/useProducts";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { products } = useProducts();
  const [filter, setFilter] = useState("all");
  const [productos, setProductos] = useState();
  useEffect(() => {
    // Asegurarse de que los productos estén cargados antes de aplicar el filtro
    if (products.length > 0) {
      if (filter === "all") {
        setProductos(products);
      } else if (filter === "iphone") {
        setProductos(products.filter((e) => e.category === "iphone"));
      } else if (filter === "Accesorio") {
        setProductos(products.filter((e) => e.category === "Accesorio"));
      }
    }
  }, [filter, products]);

  return (
    <div>
      <a href="/">
        <div className="fixed right-3 bottom-5 z-50 flex rounded-full mx-2 pr-2 bg-black border-2 border-black cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            fill="#fff" // Cambia el color de relleno a blanco
            version="1.1"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className="z-50"
          >
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm9.1 142.1c9.4-11.4 25.4-20.1 39.1-21.1 2.3 15.6-4.1 30.8-12.5 41.6-9 11.6-24.5 20.5-39.5 20-2.6-14.9 4.4-30.2 12.9-40.5zm84.3 197.8c-10.8 16.4-26 36.9-44.9 37.1-16.8.2-21.1-10.9-43.8-10.8-22.7.1-27.5 11-44.3 10.8-18.9-.2-33.3-18.7-44.1-35.1-30.2-46-33.4-99.9-14.7-128.6 13.2-20.4 34.1-32.3 53.8-32.3 20 0 32.5 11 49.1 11 16 0 25.8-11 48.9-11 17.5 0 36 9.5 49.2 26-43.2 23.7-36.2 85.4 7.5 101.9-6.1 13.2-9 19.2-16.7 31z"></path>
          </svg>
          <span className="opacity-100 flex items-center">
            <span className="ml-2 text-white">Volver al inicio</span>
          </span>
        </div>
      </a>
      <div className="w-screen flex justify-center mt-10">
        <div className=" w-12/12 md:w-3/12 flex justify-around">
          <Button
            onClick={() => setFilter("all")}
            variant={filter == "all" ? "default" : "outline"}
          >
            Todos
          </Button>
          <Button
            onClick={() => setFilter("iphone")}
            variant={filter == "iphone" ? "default" : "outline"}
          >
            Iphones
          </Button>
          <Button
            onClick={() => setFilter("Accesorio")}
            variant={filter == "Accesorio" ? "default" : "outline"}
          >
            Accesorios
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 w-10/12 mt-5 ">
          {productos &&
            productos.map((e) => (
              <div className="flex justify-center">
                <CardProduct product={e} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
