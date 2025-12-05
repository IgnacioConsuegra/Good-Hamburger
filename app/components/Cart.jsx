"use client";


import React, { useContext } from "react";
import { UserContext } from "../context/UserContext"; 
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const {cart} = useContext(UserContext);

  return (
    <a
      href="#cart"
      className="text-gray-700 flex flex-col items-center p-2 relative"
    >
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />

        {cart.length > 0 && <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs font-bold p-0.5">{cart.length}</div>}
      </div>

      <span className="text-xs mt-1">Cart</span>
    </a>
  );
};

export default Cart;
