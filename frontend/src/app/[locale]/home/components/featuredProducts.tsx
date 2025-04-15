// import { useEffect, useRef } from "react";

// const FeaturedProducts = () => {
//   const { t, currentLanguage } = useTranslationStore((state) => ({
//     t: state.t,
//     currentLanguage: state.currentLanguage,
//   }));

//   const { handleFeaturedProducts, featuredProducts } = useHomeStore(
//     (state) => ({
//       handleFeaturedProducts: state.handleFeaturedProducts,
//       featuredProducts: state.featuredProducts,
//     }),
//   );

//   const sliderRef = useRef(null);

//   useEffect(() => {
//     handleFeaturedProducts();
//   }, [handleFeaturedProducts]);

//   return (
//     <section
//       className="container p-3  "
//       dir={currentLanguage === "ar" ? "rtl" : "ltr"}
//     >
//       <h2 className="py-4 pl-4 text-xl font-bold">{t("featured")}</h2>
//       <div className="relative">
//         <div
//           className="custom-scrollbar custom-scrollbar-thin flex w-full    items-center  justify-center space-x-4 overflow-x-scroll  pb-4    sm:h-96"
//           ref={sliderRef}
//         >
//           {featuredProducts?.map((product) => (
//             <Link to={`shop/${product._id}`} key={product._id}>
//               <div className="w-64 rounded-lg bg-white p-4 shadow-md ring-1 ring-black transition-all duration-200   ease-in-out hover:scale-105">
//                 <img
//                   src={product.image.thumbnailUrl}
//                   alt={product.image_alt}
//                   className="mb-4 h-32 w-full object-contain"
//                 />
//                 <span className="flex flex-col items-center justify-center">
//                   <h3 className="text-base font-medium line-clamp-1">
//                     {product.product_name}
//                   </h3>
//                   <p className="text-indigo-500">{product.price} $</p>
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;
