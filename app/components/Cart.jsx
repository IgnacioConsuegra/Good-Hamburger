"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const itemCount = 0;

  return (
    <a
      href="#cart"
      className="text-gray-700 flex flex-col items-center p-2 relative"
    >
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />

        {itemCount > 0 && <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs font-bold p-0.5">{itemCount}</div>}
      </div>

      <span className="text-xs mt-1">Cart</span>
    </a>
  );
};

export default Cart;
