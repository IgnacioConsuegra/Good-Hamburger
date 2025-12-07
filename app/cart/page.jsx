"use client";

import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import { ShoppingBag, Trash2, Tag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    priceWithDiscount,
    subTotal,
    percentDiscount,
    handleRemoveFromCart,
    handleSubmitOrder,
  } = useContext(UserContext);
  const onRemoveFromCart = id => {
    return true;
  };
  const onSubmitOrder = id => {
    return true;
  };
  //{ id, image, title, price }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Your Cart</h2>
        <p className="text-gray-600">Review your order before checkout</p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-md">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">
            Add some delicious items to get started!
          </p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
            <div className="divide-y divide-gray-100">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 -shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-orange-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Order Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>

              {percentDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>Discount {percentDiscount}% off</span>
                  </div>
                  <span>
                    - ${((subTotal * percentDiscount) / 100).toFixed(2)}
                  </span>
                </div>
              )}

              <hr />

              <div className="flex justify-between text-gray-900">
                <span>Total</span>
                <span>${priceWithDiscount}</span>
              </div>
            </div>
          </div>

          {/* Discount Info */}
          {percentDiscount === 0 && (
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
            onClick={handleSubmitOrder}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Submit Order</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
