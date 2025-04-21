import { useEffect } from "react";

import Loader from "../../global/widgets/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import dateFormater from "../../global/dateFromater";
import statusColor from "../../global/orderStatusColors";
import useOrderStore from "../store/useOrderStore";
import UserOrderDetails from "../widgets/userOrderDetails";

const UserOrderLogs = () => {
  // !States.....
  const { orders, handleGettingUserOrders, isLoading } = useOrderStore(
    (state) => ({
      orders: state.orders,
      handleGettingUserOrders: state.handleGettingUserOrders,
      isLoading: state.isLoading,
    }),
  );
  useEffect(() => {
    handleGettingUserOrders();
  }, [handleGettingUserOrders]);

  const [selectedOrderId, setselectedOrderId] = useState(null);

  useEffect(() => {
    const unsubscribe = useOrderStore.subscribe((state, prev) => {
      if (state.orders !== prev.orders) {
        handleCancel();
      }
    });
    return unsubscribe;
  }, []);

  //! cancle and close the order detials  componenet
  function handleSelectOrder(orderId) {
    setselectedOrderId(orderId);
  }
  function handleCancel() {
    setselectedOrderId(null);
  }

  return (
    <div className="   relative p-2">
      {isLoading && (
        <div className="absolute inset-0 isolate   flex h-full w-full  items-center justify-center !overflow-hidden bg-gray-300/30 [&_*]:bg-white [&_*]:shadow-lg">
          <Loader />
        </div>
      )}

      {selectedOrderId && (
        <UserOrderDetails cancel={handleCancel} orderId={selectedOrderId} />
      )}
      <h1 className="text-grad my-4 text-3xl font-bold">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 ">View order</th>
              <th className="px-4 py-2">#Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody className="[&_td]:border  [&_tr]:text-center ">
            {orders?.map((order) => (
              <tr key={order._id}>
                <td
                  onClick={() => handleSelectOrder(order._id)}
                  className=" group  relative   box-border cursor-pointer  hover:text-indigo-500"
                >
                  <FontAwesomeIcon className="isolate " icon={faEye} />
                  <span className="absolute inset-0  -z-10 m-2   box-border hidden origin-left skew-x-6  scale-x-0  bg-slate-200 p-2 duration-200 ease-in-out group-hover:skew-x-0 group-hover:scale-x-100 md:block"></span>
                </td>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td
                  className={`select-none border px-4 py-2 ${statusColor(
                    order.orderStatus,
                  )}`}
                >
                  {order.orderStatus}
                </td>
                <td>{dateFormater(order.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrderLogs;
