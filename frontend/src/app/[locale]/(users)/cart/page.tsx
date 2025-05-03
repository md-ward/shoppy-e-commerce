import React from "react";

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Shopping Cart</h1>
        <div className="space-y-4">
          {/* Example cart item */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              some images here
              <div>
                <h2 className="text-lg font-semibold">Product Name</h2>
                <p className="text-gray-500">Quantity: 1</p>
              </div>
            </div>
            <p className="text-lg font-semibold">$50.00</p>
          </div>
          {/* Add more cart items here */}
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>$50.00</span>
          </div>
          <button className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
