"use client";

import { ProductForm } from "@/components/Forms/ProductForm";
import { TableProducts } from "@/components/Tables/TableProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Page = () => {
  const password = "Paterson2020";
  const [password_, setPassword_] = useState();
  useEffect(() => {
    // Recuperar la contraseña almacenada en localStorage
    const storedPassword = localStorage.getItem("password");
    if (storedPassword) {
      setPassword_(storedPassword);
    }
  }, []);

  useEffect(() => {
    if (password === password_) {
      gsap.to(".admin", {
        opacity: 1,
        delay: 1,
        onComplete: function () {
          // Cambia display después de que la animación de opacidad se complete
          const adminElement = document.querySelector(".admin");
          if (adminElement) {
            adminElement.style.display = "flex";
          }
        },
      });

      gsap.to(".bye", {
        opacity: 0,
        duration: 0.4,
        onComplete: function () {
          const byeElement = document.querySelector(".bye");
          if (byeElement) {
            byeElement.style.display = "none";
          }
        },
      });

      handlePasswordSubmit();
    }
  }, [password_]);

  const handlePasswordChange = (event) => {
    setPassword_(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === password_) {
      localStorage.setItem("password", password_);
      console.log("Contraseña guardada en localStorage");
    } else {
      console.log("Contraseña incorrecta");
    }
  };

  return (
    <div className="bg-black">
      <div className="bye h-screen w-screen flex items-center justify-center">
        <Input className="w-6/12 bg-white" onChange={handlePasswordChange} />
        <Button
          onClick={handlePasswordSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </Button>
      </div>
      <div
        className="h-screen  items-center justify-center bg-black admin "
        style={{ display: "none", opacity: "none" }}
      >
        <ScrollArea className="h-80vh w-12/12 md:w-10/12 h-[80vh] p-5 bg-white rounded-xl flex justify-center">
          <Tabs defaultValue="account" className="h-[60vh] w-11/12">
            <TabsList className="flex justify-center">
              <TabsTrigger value="account">Crear Producto</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="orders">Ordenes</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <ProductForm />
            </TabsContent>
            <TabsContent value="products">
              <TableProducts />
            </TabsContent>
            <TabsContent value="orders">{/* <TableOrders /> */}</TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
