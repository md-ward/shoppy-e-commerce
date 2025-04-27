'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Eye } from "lucide-react";
import { useProductsStore } from "@/app/[locale]/(admin)/state/products.state";

 function AddProductPage() {
  const t = useTranslations("Admin.Products.Add");
  const router = useRouter();
  const { addProduct } = useProductsStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [stock, setStock] = useState(0);
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(files);
      setPreviewImage(URL.createObjectURL(files[0]));
    }
  };

  const handleAddProduct = async () => {
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("price", String(price));
      data.append("categoryId", String(categoryId));
      data.append("stock", String(stock));
      if (files) {
        for (const file of Array.from(files)) {
          data.append("files", file);
        }
      }
      const response = await axios.post("/api/admin/products", data);
      const product = response.data;
      addProduct(product);
      router.push(`/admin/products`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <label className="flex flex-col gap-2">
        {t("name")}
        <input
          type="text"
          className="rounded-md border border-gray-300 p-2"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className="flex flex-col gap-2">
        {t("description")}
        <textarea
          className="rounded-md border border-gray-300 p-2"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label className="flex flex-col gap-2">
        {t("price")}
        <input
          type="number"
          className="rounded-md border border-gray-300 p-2"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
        />
      </label>
      <label className="flex flex-col gap-2">
        {t("category")}
        <select
          className="rounded-md border border-gray-300 p-2"
          value={categoryId}
          onChange={(event) => setCategoryId(Number(event.target.value))}
        >
          <option value={0}>{t("selectCategory")}</option>
          {/* TODO: get categories from API */}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        {t("stock")}
        <input
          type="number"
          className="rounded-md border border-gray-300 p-2"
          value={stock}
          onChange={(event) => setStock(Number(event.target.value))}
        />
      </label>
      <label className="flex flex-col gap-2">
        {t("image")}
        <input
          type="file"
          className="rounded-md border border-gray-300 p-2"
          onChange={handleImageChange}
        />
        {previewImage && (
          <Image
            src={previewImage}
            alt={name}
            className="h-auto w-full"
            width={400}
            height={400}
          />
        )}
      </label>
      <div className="flex items-center gap-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleAddProduct}
        >
          {t("addProduct")}
        </button>
        <button
          className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
          onClick={() => router.push(`/admin/products`)}
        >
          {t("cancel")}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Eye
          className="cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
        <input
          type={showPassword ? "text" : "password"}
          className="rounded-md border border-gray-300 p-2"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
        />
      </div>
    </div>
  );
}

export default AddProductPage;