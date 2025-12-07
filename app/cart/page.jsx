"use client";

import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import { ShoppingBag, Tag, ArrowRight } from "lucide-react";
import CartItem from "./CartItem";

export default function CartPage() {
  const {
    handleSubmitOrder,
    handleRemoveFromCart,
    userName,
    priceData,
    handleUserName,
    cart,
  } = useContext(UserContext);

  //This will be used only to ask the user his userName
  const [name, setName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleSubmitButton = () => {
    if (!userName) {
      setShowInput(true);
      return;
    }
    handleSubmitOrder();
  };
  const handleNameSent = name => {
    handleUserName(name);
    setShowInput(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-0.1 md:py-8 min-h-screen pb-24">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Your Cart</h2>
        <p className="text-gray-600">Review your order before checkout</p>
      </div>
      {/* This part will show that the user does not have any items yet. */}
      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-md">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">
            Add some delicious items to get started!
          </p>
        </div>
      ) : (
        // Our current cart.
        <>
          {/* Cart Items */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
            <div className="divide-y divide-gray-100">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Order Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${priceData.subTotal.toFixed(2)}</span>
              </div>

              {priceData.percentDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>Discount {priceData.percentDiscount}% off</span>
                  </div>
                  <span>
                    - $
                    {(
                      (priceData.subTotal * priceData.percentDiscount) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>
              )}

              <hr />

              <div className="flex justify-between text-gray-900">
                <span>Total</span>
                <span>${priceData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Discount Info */}
          {priceData.percentDiscount === 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
              <h4 className="text-amber-900 mb-2">💡 Available Discounts</h4>
              <ul className="text-amber-800 space-y-1 text-sm">
                <li>• Sandwich + Fries + Drink = 20% off</li>
                <li>• Sandwich + Drink = 15% off</li>
                <li>• Sandwich + Fries = 10% off</li>
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmitButton}
            className="
    w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl shadow-lg 
    flex items-center justify-center gap-2 cursor-pointer 
    active:scale-95 active:shadow-inner transition-all duration-150
  "
          >
            <span>Submit Order</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* This will open if we don't have  userName, and the user submit the order*/}
      {userName.length === 0 && showInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              May we know your name ?
            </h2>

            <input
              onChange={ev => setName(ev.target.value)}
              type="text"
              placeholder="Your name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleNameSent("")}
                className="px-4 py-2 rounded-lg bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleNameSent(name)}
                className="px-4 py-2 rounded-lg bg-orange-600 text-white cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
