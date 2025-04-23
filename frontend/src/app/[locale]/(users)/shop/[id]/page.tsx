import axios from "axios";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

const ProductDetails= await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
  );
  console.log(ProductDetails.data);
  

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Product Detail</h1>
        <p className="text-lg">Product ID: {id}</p>
        <p className="text-lg">More product details will be displayed here.</p>
      </div>
    </div>
  );
};
export default ProductDetailPage;
