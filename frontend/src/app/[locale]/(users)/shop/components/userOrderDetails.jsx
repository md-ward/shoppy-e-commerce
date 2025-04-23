import { useEffect } from "react";
import Loader from "../../global/widgets/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import statusColor from "../../global/orderStatusColors";
import PropTypes from "prop-types";
import useOrderStore from "../store/useOrderStore";

const UserOrderDetails = ({ orderId, cancel }) => {
  const {
    userOrderDetails,
    handleGettingUserOrderDetails,
    isLoading,
    hadnleOrderCanceling,
  } = useOrderStore((state) => ({
    userOrderDetails: state.userOrderDetails,
    handleGettingUserOrderDetails: state.handleGettingUserOrderDetails,
    isLoading: state.isLoading,
    hadnleOrderCanceling: state.hadnleOrderCanceling,
  }));

  useEffect(() => {
    handleGettingUserOrderDetails(orderId);
  }, [handleGettingUserOrderDetails, orderId]);

  const handleStatusChange = () => {
    if (confirm("by clicking ok you confirm to cancel this order..! "))
      hadnleOrderCanceling(orderId);
  };

  return (
    <div className=" absolute inset-0 top-5 z-50     w-full rounded-md  shadow-md">
      {isLoading && (
        <div className="absolute  inset-0 flex h-full w-full  items-center justify-center  [&_*]:bg-white">
          <Loader />
        </div>
      )}

      <div className="rounded-md bg-white p-4 shadow-md">
        <span className="flex justify-between">
          <h3 className="mb-4 text-2xl font-bold">Billing Details</h3>
          <FontAwesomeIcon
            className="aspect-square cursor-pointer rounded-full bg-gray-500 p-2 text-white ring-gray-400 hover:ring"
            onClick={cancel}
            icon={faClose}
          />
        </span>
        <hr className="mb-4 border-b-2" />
        <p>
          <strong>Customer Name:</strong> {userOrderDetails?.customer.name}
        </p>
        <p>
          <strong>Address:</strong> {userOrderDetails?.address}
        </p>
        <p>
          <strong>City:</strong> {userOrderDetails?.city}
        </p>
        <p>
          <strong>Zip:</strong> {userOrderDetails?.zip}
        </p>
        <p>
          <strong>Phone:</strong> {userOrderDetails?.phone}
        </p>
        <p>
          <strong>Email:</strong> {userOrderDetails?.customer.email}
        </p>
        <h3 className="mb-4 mt-8 text-2xl font-bold">Product Details</h3>
        <hr className="mb-4 border-b-2" />
        <table className="mb-8 w-full">
          <thead>
            <tr>
              <th className="text-left">Product Name</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Price</th>
              <th className="text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {userOrderDetails?.products.map((item, index) => (
              <tr key={index}>
                <td>{item.productId.product_name}</td>
                <td>{item.quantity}</td>
                <td>${item.productId.price}</td>
                <td>$ {item.productId.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-2xl font-bold">
          Total Price: ${userOrderDetails?.totalPrice}
        </h3>
        <div className=" mt-2  flex w-full  justify-between gap-2 rounded-md px-2 py-1">
          <span className="neumorphism-shadow flex items-center gap-2 rounded-md p-1">
            <h1>Current status :</h1>
            <p className={`    ${statusColor(userOrderDetails?.orderStatus)}`}>
              {userOrderDetails?.orderStatus}
            </p>
          </span>
          {userOrderDetails?.canCancel ? (
            <span className="neumorphism-shadow  flex select-none flex-col   items-center gap-3 p-2">
              <button
                className="  ml-4 cursor-pointer rounded bg-rose-500 px-4 py-2 !text-sm font-bold text-white duration-200 ease-in-out hover:bg-white hover:text-rose-500 hover:ring hover:ring-rose-500"
                onClick={handleStatusChange}
              >
                Cancel order
              </button>
              <p className="ml-4 text-sm text-gray-500">
                You can cancel this order.
              </p>
            </span>
          ) : (
            <p className="ml-4 text-sm text-gray-500">
              Cancellation not available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
UserOrderDetails.propTypes = {
  cancel: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default UserOrderDetails;
