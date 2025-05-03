import axios from "axios";
import ProductImages from "../../components/ProductImages";
import { Product } from "@/lib/types";
import Accordion from "../../components/Accordion";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const mainImage = "/mug.jpg";
  const images = ["/mug.jpg", "/pen.jpg", "/logo.png"];
  const variants = [
    { color: "red", size: "small", quantity: 10 },
    { color: "black", size: "medium", quantity: 10 },
  ];

  const ProductDetails = (await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
    .then((res) => res.data.product)) as Product;
  console.log({ ProductDetails });

  return (
    <section className="text-foreground dark:bg-foreground dark:text-foreground-dark w-full grow bg-white px-4 py-12">
      <CustomButton />
      <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-stretch gap-10 md:grid-cols-2">
        {/* Product Images */}
        <div className="dark:bg-secondary-dark flex w-fit items-center justify-center rounded-xl p-4">
          <ProductImages images={images} mainImage={mainImage} />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between gap-6 rounded-xl p-8">
          <div>
            <div className="flex flex-col justify-between gap-4">
              <h1 className="text-foreground text-4xl font-bold dark:text-white">
                {ProductDetails.name}
              </h1>
              <span className="w-fit rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-[11px] font-bold text-white shadow-md">
                ${ProductDetails.price}
              </span>
              <span className="mb-2 flex items-stretch gap-2">
                <label htmlFor="categories">Category:</label>
                <span className="dark:border-accent text-accent-dark inline-flex items-center rounded-md bg-blue-50 p-0.5 px-1 text-xs font-medium ring-1 ring-blue-700/10 ring-inset dark:border dark:bg-transparent">
                  {ProductDetails.category.name}
                </span>
              </span>
            </div>

            {/* <Divider variant="Horizontal" /> */}
            <Accordion
              title="Description"
              content={ProductDetails.description}
            />

            {/* Variant Section (optional example) */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Available Variants</h3>
              {variants.map((v, idx) => (
                <div
                  key={idx}
                  className="border-border dark:border-foreground/20 flex items-center justify-between rounded-md border p-3 text-sm"
                >
                  <span className="capitalize">Color: {v.color}</span>
                  <span className="capitalize">Size: {v.size}</span>
                  <span>Qty: {v.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <span className="flex flex-row gap-2">
            <button className="bg-primary hover:bg-primary-light dark:bg-primary-dark dark:hover:bg-primary-light-dark mt-6 w-full rounded-xl px-6 py-3 font-medium text-white shadow-md transition-all">
              Add to Cart
            </button>
            <button className="bg-primary hover:bg-primary-light dark:bg-primary-dark dark:hover:bg-primary-light-dark mt-6 w-fit rounded-xl px-6 py-3 font-medium text-nowrap text-white shadow-md transition-all">
              Buy now
            </button>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
const CustomButton = () => {
  return (
    <div className="border-border -mt-4 mb-10 rounded-2xl border p-6 shadow">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200">
            🎨
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              Want to personalize this product?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Buy it as-is or customize it with your own text, image, or logo.
              Make it uniquely yours!
            </p>
          </div>
        </div>
        <div className="mt-4 w-full text-right md:mt-0 md:w-auto">
          <button className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700 md:w-auto dark:from-purple-700 dark:to-blue-700 dark:hover:from-purple-800 dark:hover:to-blue-800">
            ✏️ Customize Your Design
          </button>
        </div>
      </div>
    </div>
  );
};
