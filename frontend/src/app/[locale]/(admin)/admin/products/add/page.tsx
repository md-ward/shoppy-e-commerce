"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import AnimatedSwitchingButton from "@/app/[locale]/(users)/components/AnimatedSwitchingButton";

function AddProductPage() {
  const t = useTranslations("Admin.Products.Add");
  const router = useRouter();

  const [lang, setLang] = useState<"en" | "ar">("en");

  const [enName, setEnName] = useState("");
  const [arName, setArName] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [arDescription, setArDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [enCategoryName, setEnCategoryName] = useState("");
  const [arCategoryName, setArCategoryName] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(files);
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewImages([...previewImages, ...previews]);
    }
  };

  const handleAddProduct = async () => {
    try {
      const data = new FormData();
      data.append("en_name", enName);
      data.append("ar_name", arName);
      data.append("en_description", enDescription);
      data.append("ar_description", arDescription);
      data.append("price", String(price));
      data.append("stock", String(stock));
      data.append("category_id", String(categoryId));
      data.append("ar_category", arCategoryName);
      data.append("en_category", enCategoryName);

      if (files) {
        for (const file of Array.from(files)) {
          data.append("files", file);
        }
      }

     await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      router.push(`/admin/products`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-8 bg-gray-50 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <div className="flex gap-2">
          <button
            className={`rounded-full px-4 py-1 font-medium ${lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setLang("en")}
          >
            English
          </button>
          <button
            className={`rounded-full px-4 py-1 font-medium ${lang === "ar" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setLang("ar")}
          >
            العربية
          </button>
        </div>
      </div>

      <div className="grid grow grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Inputs */}
        <div className="col-span-2 flex flex-col gap-6">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">
              {t("generalInformation")}
            </h2>

            {/* Bilingual Name and Description */}
            {lang === "en" ? (
              <>
                <label className="mb-1 block text-sm font-medium">
                  {t("productName")} (EN)
                </label>
                <input
                  type="text"
                  className="mb-4 w-full rounded-md border p-2"
                  value={enName}
                  onChange={(e) => setEnName(e.target.value)}
                />

                <label className="mb-1 block text-sm font-medium">
                  {t("description")} (EN)
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-md border p-2"
                  value={enDescription}
                  onChange={(e) => setEnDescription(e.target.value)}
                />
              </>
            ) : (
              <>
                <label className="mb-1 block text-sm font-medium">
                  {t("productName")} (AR)
                </label>
                <input
                  type="text"
                  className="mb-4 w-full rounded-md border p-2"
                  dir="rtl"
                  value={arName}
                  onChange={(e) => setArName(e.target.value)}
                />

                <label className="mb-1 block text-sm font-medium">
                  {t("description")} (AR)
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-md border p-2"
                  dir="rtl"
                  value={arDescription}
                  onChange={(e) => setArDescription(e.target.value)}
                />
              </>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("price")}
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border p-2"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("stock")}
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border p-2"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>
            </div>

            <CategoryHandler
              enCategoryName={enCategoryName}
              arCategoryName={arCategoryName}
              setArCategoryName={setArCategoryName}
              setEnCategoryName={setEnCategoryName}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              t={t}
              lang={lang}
            />
          </div>
        </div>
        <div className="flex h-full w-full flex-col justify-between">
          {/* Image Upload */}
          <ProductImagesHandler
            handleImageChange={handleImageChange}
            previewImages={previewImages}
            t={t}
            key={"images"}
          />
          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              className="rounded-lg bg-gray-400 px-6 py-2 font-bold text-white hover:bg-gray-500"
              onClick={() => router.push(`/admin/products`)}
            >
              {t("cancel")}
            </button>
            <button
              className="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
              onClick={handleAddProduct}
            >
              {t("publish")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;

//! images selection for uploading
const ProductImagesHandler = ({
  previewImages,
  handleImageChange,
  t,
}: {
  previewImages: string[];
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  t: (translation: string) => string;
}) => {
  const imgRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex max-h-[500px] flex-col gap-6 overflow-y-auto">
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">{t("productImages")}</h2>
          {/* Add More Button */}
          <Plus
            onClick={() => {
              imgRef.current?.click();
            }}
            className="aspect-square h-7 w-7 cursor-pointer rounded-full bg-gray-100 text-blue-500"
          />
          <input
            ref={imgRef}
            type="file"
            multiple
            onChange={handleImageChange}
            className="absolute inset-0 z-20 hidden h-full w-full opacity-0"
          />
        </div>
        <div className="row-span-2 mt-4 grid grid-cols-2 gap-2 *:aspect-square">
          {previewImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Preview ${index}`}
              width={150}
              height={150}
              className="rounded-md object-cover"
            />
          ))}
          {previewImages.length < 4 &&
            Array.from({ length: 4 - previewImages.length }).map((_, index) => {
              return (
                <div
                  style={{
                    width: 145,
                    height: 145,
                  }}
                  key={index}
                  className="flex aspect-square items-center justify-center rounded-md border border-dashed bg-gray-100 text-center"
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

// ? Category handler
const CategoryHandler = ({
  categoryId,
  setCategoryId,
  t,
  lang,
  arCategoryName,
  enCategoryName,
  setArCategoryName,
  setEnCategoryName,
}: {
  categoryId: number;
  setCategoryId: (id: number) => void;
  t: (translation: string) => string;
  lang: "en" | "ar";
  arCategoryName: string;
  enCategoryName: string;
  setArCategoryName: (name: string) => void;
  setEnCategoryName: (name: string) => void;
}) => {
  const [addCategory, setAddCategory] = useState<boolean>(false);

  return (
    <div className="mt-6">
      <div className="flex flex-row items-center gap-2">
        <label className="mb-1 block text-sm font-medium">
          {t("category")}
        </label>
        <select
          className="w-full rounded-md border p-2"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value={0}>{t("selectCategory")}</option>
          {/* TODO: Populate dynamically */}
        </select>
        <AnimatedSwitchingButton
          onSwitch={() => setAddCategory(!addCategory)}
          FirstIcon={<Plus className="text-background-dark cursor-pointer" />}
          SecondIcon={<X className="text-background-dark cursor-pointer" />}
          isEditable={addCategory}
        />
      </div>

      {addCategory && (
        <div className="mt-4 flex flex-col gap-4">
          {lang === "en" ? (
            <>
              <label className="block text-sm font-medium">
                Category in : (EN)
              </label>
              <input
                type="text"
                className="w-full rounded-md border p-2"
                value={enCategoryName}
                onChange={(e) => setEnCategoryName(e.target.value)}
              />
            </>
          ) : (
            <>
              <label className="block text-sm font-medium">
                Category in : (AR)
              </label>
              <input
                type="text"
                dir="rtl"
                className="w-full rounded-md border p-2"
                value={arCategoryName}
                onChange={(e) => setArCategoryName(e.target.value)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
