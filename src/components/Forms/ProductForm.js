"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";

export const ProductForm = ({ product }) => {
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "AVIF", "WEBP"];
  const [images_, setImages_] = useState([]);
  const { toast } = useToast();
  const [category, setCategory] = useState("");

  useEffect(() => {
    product && setValue("images", product.images);
    product && setImages_(product.images);
    product && setValue("title", product.title);
    product && setValue("price", product.price);
    product && setValue("description", product.description);
    product && setValue("category", product.category);
    product && setCategory(product.category);
    product && setValue("subcategory", product.subcategory);
    product && setValue("isUSD", product.isUSD);
  }, [product]);

  const handleFileChange = async (file) => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dwupzgtpo/image/upload`,
        formData
      );
      const data = response.data;
      const currentImages = getValues("images");

      const updatedImages = currentImages
        ? [...currentImages, data.secure_url]
        : [data.secure_url];

      setValue("images", updatedImages);
      setImages_(updatedImages);
    } catch (er) {
      console.log(er);
    }
  };

  const deleteImage = (img) => {
    const newImages = images_.filter((e) => e != img);
    setImages_(newImages);
    setValue("images", newImages);
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!product) {
      const response = await axios.post("/api/products", data);

      response &&
        toast({
          title: "Producto creado correctamente",
          description: "",
        });
    } else {
      const response = await axios.put("/api/products", {
        _id: product._id,
        ...data,
      });
      response &&
        toast({
          title: "Producto modificado correctamente",
          description: "",
        });
    }
  };
  const isUSD = watch("isUSD", product ? product.isUSD : false);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setValue("category", value);
  };
  return (
    <div>
      <section className="flex justify-center mt-10">
        <div className="w-10/12">
          <FileUploader
            label="Sube o Arrastra tus fotos aqui"
            handleChange={handleFileChange}
            name="file"
            types={fileTypes}
            maxSize={4}
          />
        </div>
      </section>
      <div className="flex justify-start flex-wrap mt-5">
        {images_ &&
          images_.map((e, index) => (
            <div
              className="mx-2 flex justify-center w-10/12 flex-col items-center"
              key={index}
            >
              <img src={e} className="w-[50px]" />
              <div className=" mt-1 cursor-pointer">
                <span
                  variant="destructive"
                  className="bg-red-900 text-white px-2 rounded-xl"
                  onClick={() => deleteImage(e)}
                  size="sm"
                >
                  Eliminar
                </span>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-10/12">
          <Input placeholder="Titulo" className="my-2" {...register("title")} />

          <section className="my-2">
            <Select onValueChange={(e) => handleCategoryChange(e)}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Selecciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoria</SelectLabel>
                  <SelectItem value="iphone">IPhone</SelectItem>
                  <SelectItem value="Accesorio">Accesorio</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </section>

          <Textarea
            placeholder="descripcion"
            className="my-2"
            {...register("description")}
          />

          {category !== "iphone" && (
            <div>
              <label htmlFor="price">Precio</label>
              <Input type="number" {...register("price", { required: true })} />
              {errors.price && <p>El precio es requerido</p>}
            </div>
          )}
          <section>
            <Button className="mt-5">Enviar</Button>
          </section>
        </form>
      </div>
    </div>
  );
};
