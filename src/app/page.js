"use client";
import { CardProduct } from "@/components/Cards/CardProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useProducts from "@/hooks/useProducts";
import Image from "next/image";
//#e357ab
//[#722cc4]
export default function Home() {
  const { products } = useProducts();
  const mensaje = `Hola! quisiera la ubicación del showroom`;
  const mensajeUrlEncoded_ = encodeURIComponent(mensaje);
  const enlaceWaLink_ = `https://wa.me/5492484650674?text=${mensajeUrlEncoded_}`;
  return (
    <main className="bg-white ">
      <a href="/productos">
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
            <span className="ml-2 text-white">Ver productos</span>
          </span>
        </div>
      </a>
      <section className="pt-10 h-fit md:h-screen">
        <p className="font-geist text-xl md:text-4xl tracking-tighter text-[#e357ab] font-bold text-center  ">
          Bienvenido a
        </p>
        <div className="flex justify-center ">
        <img src="/logo.png" className="w-3/12" />
        </div>
        <div className="flex justify-center">
          <p className="w-10/12 text-center mt-5 tracking-tighter opacity-70 font-light text-md md:text-2xl">
            Traemos lo mejor de Apple a Tandil, ofreciendo productos de última
            tecnología directamente para ti.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/photo.jpeg"
            className="w-12/12 border-2 rounded-xl shadowLow border-black mt-10"
          />
        </div>
      </section>
      <section className="mt-10 md:mt-0">
        <p className="font-geist font-bold text-4xl text-center tracking-tighter md:text-7xl mb-5 mx-5 ">
          Visitanos en nuestro Showroom
        </p>
        <div className="flex justify-center">
          <a href={enlaceWaLink_}>
            <Button size="lg" className="bg-black hover:bg-gray-700">
              Obtener dirección
            </Button>
          </a>
        </div>
      </section>
      <section className=" py-28 bg-white">
        <p className="font-geist font-bold text-4xl tracking-tighter md:text-7xl mb-5  opacity-50 mx-5 ">
          Descubre tu nuevo IPhone
        </p>{" "}
        <div className="flex justify-center">
          <ScrollArea className="w-screen whitespace-nowrap rounded-md ">
            {products
              .filter((p) => p.category == "iphone")
              .map((e, index) => (
                <CardProduct product={e} key={index} />
              ))}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <p className="font-geist mt-10 font-bold text-4xl tracking-tighter  md:text-7xl mb-5  opacity-50 mx-5 ">
          Accesorios
        </p>{" "}
        <div className="flex justify-center">
          <ScrollArea className="w-screen whitespace-nowrap rounded-md ">
            {products
              .filter((p) => p.category == "Accesorio")
              .map((e, index) => (
                <CardProduct product={e} key={index} />
              ))}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
    </main>
  );
}
