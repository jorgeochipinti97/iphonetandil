import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useProducts from "@/hooks/useProducts";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import axios from "axios";
import { formatPrice } from "@/lib/utils";
import { ProductForm } from "../Forms/ProductForm";
import { useToast } from "../ui/use-toast";


export const TableProducts = () => {
  const { products, loading, error } = useProducts();
const {toast}= useToast()
  const onDelete = async (_id) => {
    const response = await axios.delete(`/api/products?_id=${_id}`);
response &&      toast({
  title: "Producto eliminado correctamente",
  description: "",
});
  };

  return (
    <Table>
      <TableCaption>Lista de productos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=""></TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="">Categoria</TableHead>

          <TableHead className="">Accion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.map((e, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <img src={`${e.images[0]}`} className="w-[100px] rounded-xl" />
              </TableCell>
              <TableCell className="font-medium">{e.title}</TableCell>
              <TableCell>{formatPrice(e.price)}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell className="flex flex-col">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="my-1" size="sm">
                      Editar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <ProductForm product={e} />
                    <AlertDialogCancel>volver</AlertDialogCancel>
                  </AlertDialogContent>
                  <AlertDialogFooter></AlertDialogFooter>
                </AlertDialog>

                <Button
                  className="my-1"
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(e._id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
