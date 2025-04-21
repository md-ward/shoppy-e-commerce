import { useParams } from "react-router-dom";
import RatingComponent from "../widgets/rating_stars";
import ImageGallery from "../../global/widgets/image_gallery";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import useTranslationStore from "../../global/state/useTranslationStore";
import useDashboardFeaturesStore from "../../admin/store/useDashboardFeaturesStore";
import Loader from "../../global/widgets/loader";
import useCartStore from "../../cart/store/useCartStore";
import CommentsWidget from "../widgets/comments";

const ProductDetail = () => {
  const { productId } = useParams();
  const productDetailPageref = useRef();
  const { currentLanguage, t } = useTranslationStore((state) => ({
    currentLanguage: state.currentLanguage,
    t: state.t,
  }));
  const { handleAddProductToCart, itemQuantity } = useCartStore((state) => ({
    handleAddProductToCart: state.handleAddProductToCart,
    itemQuantity: state.itemQuantity,
  }));

  //! stagger effect on first time page loaded
  useEffect(() => {
    gsap.fromTo(
      productDetailPageref.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 },
    );
  }, []);

  const { handleSingleProductDetails, singleProduct, isLoading } =
    useDashboardFeaturesStore((state) => ({
      handleSingleProductDetails: state.handleSingleProductDetails,
      singleProduct: state.singleProduct,
      isLoading: state.isLoading,
    }));
  useEffect(() => {
    handleSingleProductDetails(productId);
  }, [handleSingleProductDetails, productId]);

  return (
    <div
      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
      ref={productDetailPageref}
      className="relative bg-white py-8"
    >
      {isLoading && (
        <>
          <div className="absolute z-50 flex h-full w-full items-center justify-center bg-slate-50/40 [&_*]:bg-white ">
            <Loader />
          </div>
        </>
      )}
      <div className="mx-auto max-w-7xl rounded-lg border border-gray-300 px-4      py-8 shadow-md">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-3xl font-bold text-indigo-900">
              {t("productDetails")}
            </h1>
            <div className="rounded-md bg-gray-50 p-4 shadow-sm">
              <h2 className="mb-2 text-2xl font-bold">
                {singleProduct?.product_name}
              </h2>
              <p className="mb-4">{singleProduct?.description}</p>
              <p className="font-bold">Price: ${singleProduct?.price}</p>
              <p className="font-bold">Category: {singleProduct?.category}</p>
              <div className="font-bold">
                Rating:
                <RatingComponent
                  className="flex"
                  readOnly
                  rate={singleProduct?.rate}
                />
              </div>
            </div>

            {/* comments.... */}

            <CommentsWidget productId={productId} />

            <button
              disabled={singleProduct?.quantity_in_stock == 0}
              onClick={() =>
                handleAddProductToCart(
                  productId,
                  1,
                  singleProduct.image.thumbnailUrl,
                  singleProduct.product_name,
                  singleProduct.price,
                  singleProduct.product_name,
                )
              }
              content="out of stock"
              className="
              group
              mt-8 rounded
              bg-indigo-500 px-4 py-2 font-bold text-white shadow-md hover:bg-indigo-600 hover:shadow-inner disabled:bg-slate-400 disabled:after:content-[attr(content)]"
            >
              <span className="flex gap-2   group-[:disabled]:hidden">
                <h3>{t("addToCart")}</h3>
                {itemQuantity(productId) && (
                  <p className="rounded-md bg-slate-100 px-2 text-indigo-900">
                    {itemQuantity(productId)}
                  </p>
                )}
              </span>
            </button>
          </div>
          {singleProduct && (
            <ImageGallery images={[singleProduct.image?.originalUrl]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
