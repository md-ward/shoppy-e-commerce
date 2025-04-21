import PropTypes from "prop-types";
import RatingComponent from "./rating_stars";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import useCartStore from "../../cart/store/useCartStore";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  function handleNavToProductPage() {
    navigate(`/shop/${product._id}`);
  }
  const { handleAddProductToCart, itemQuantity } = useCartStore((state) => ({
    handleAddProductToCart: state.handleAddProductToCart,
    itemQuantity: state.itemQuantity,
  }));

  return (
    <div className="neumorphism-shadow flex  flex-col rounded-xl  border border-indigo-500 p-1 ">
      <div 
      className=" relative flex h-48 items-center justify-center rounded-xl bg-white shadow-sm"
      >
        <img
          src={product.image.thumbnailUrl}
          alt={product.image.image_alt}
          className="h-full w-full object-scale-down"
        />

        <FontAwesomeIcon
          className="absolute right-0 top-0 cursor-pointer    rounded-xl bg-indigo-500 p-2 text-white"
          onClick={handleNavToProductPage}
          size="lg"
          icon={faEye}
        />
      </div>

      <div className="mt-4 flex flex-col">
        <span className="inline-flex justify-between">
          <p className="text-blue-gray-900 mb-2  line-clamp-2 text-lg font-medium">
            {product.product_name}
          </p>
          <p className="text-blue-gray-900 text-lg font-medium">
            ${product.price}
          </p>
        </span>
        <RatingComponent
          className="mt-2 flex items-center"
          rate={product.rate}
          readOnly={true}
          starSize={28}
        />
        <p className="mt-2  overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-700">
          {product.description}
        </p>
        <div className="mt-4 flex  gap-2">
          <button
            onClick={() =>
              handleAddProductToCart(
                product._id,
                1,
                product.image.thumbnailUrl,
                product.product_name,
                product.price,
                product.product_name,
              )
            }
            disabled={product.quantity_in_stock == 0}
            className="hover:custome_grad w-full rounded-lg bg-gray-900/10 px-6 py-3 text-xs font-bold uppercase text-blue-900 transition-all hover:scale-95 hover:text-white  focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Add to Cart
          </button>
          {itemQuantity(product._id) && (
            <p className="flex basis-14 items-center justify-center rounded-md bg-indigo-500 text-white ">
              {itemQuantity(product._id)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    quantity_in_stock: PropTypes.number,
    image: PropTypes.shape({
      thumbnailUrl: PropTypes.string.isRequired,
      image_alt: PropTypes.string.isRequired,
    }),
    rate: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
