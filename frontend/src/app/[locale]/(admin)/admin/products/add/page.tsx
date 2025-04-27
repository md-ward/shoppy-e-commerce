'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useProductsStore } from "@/app/[locale]/(admin)/state/products.state";

function AddProductPage() {
  const t = useTranslations("Admin.Products.Add");
  const router = useRouter();
  const { addProduct } = useProductsStore();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [tag, setTag] = useState("");
  const [visibility, setVisibility] = useState<"Published" | "Schedule" | "Hidden">("Published");
  const [publishDate, setPublishDate] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(files);
      const previews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const handleAddProduct = async () => {
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("brand", brand);
      data.append("description", description);
      data.append("price", String(price));
      data.append("discount", String(discount));
      data.append("stock", String(stock));
      data.append("categoryId", String(categoryId));
      data.append("tag", tag);
      data.append("visibility", visibility);
      data.append("publishDate", publishDate);

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
    <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      {/* Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Side (Main Inputs) */}
        <div className="col-span-2 flex flex-col gap-6">

          {/* General Info */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t("generalInformation")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t("productName")}</label>
                <input
                  type="text"
                  className="w-full rounded-md border p-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("brand")}</label>
                <input
                  type="text"
                  className="w-full rounded-md border p-2"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">{t("description")}</label>
              <textarea
                className="w-full rounded-md border p-2"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t("price")}</label>
                <input
                  type="number"
                  className="w-full rounded-md border p-2"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("discount")}</label>
                <input
                  type="number"
                  className="w-full rounded-md border p-2"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </div>
            </div>

          </div>

          {/* Category and Stock */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t("stockAndCategory")}</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t("stock")}</label>
                <input
                  type="number"
                  className="w-full rounded-md border p-2"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("category")}</label>
                <select
                  className="w-full rounded-md border p-2"
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                >
                  <option value={0}>{t("selectCategory")}</option>
                  {/* TODO: Fetch real categories */}
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side (Images and Settings) */}
        <div className="flex flex-col gap-6">

          {/* Upload Images */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t("productImages")}</h2>
            <input
              type="file"
              multiple
              className="w-full p-2 border rounded-md"
              onChange={handleImageChange}
            />
            <div className="grid grid-cols-2 gap-2 mt-4">
              {previewImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  className="rounded-md object-cover"
                />
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t("visibility")}</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Published"
                  checked={visibility === "Published"}
                  onChange={() => setVisibility("Published")}
                />
                {t("published")}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Schedule"
                  checked={visibility === "Schedule"}
                  onChange={() => setVisibility("Schedule")}
                />
                {t("schedule")}
              </label>
              {visibility === "Schedule" && (
                <input
                  type="date"
                  className="w-full rounded-md border p-2"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              )}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Hidden"
                  checked={visibility === "Hidden"}
                  onChange={() => setVisibility("Hidden")}
                />
                {t("hidden")}
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t("tags")}</h2>
            <input
              type="text"
              className="w-full rounded-md border p-2"
              placeholder={t("enterTags")}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>

        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end mt-8">
        <button
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg"
          onClick={() => router.push(`/admin/products`)}
        >
          {t("cancel")}
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          onClick={handleAddProduct}
        >
          {t("publish")}
        </button>
      </div>
    </div>
  );
}

export default AddProductPage;
