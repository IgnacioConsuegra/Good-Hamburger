"use client";

import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Cart = () => {
  const { cart } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === "/cart";
  return (
    <button
      onClick={() => router.push("/cart")}
      className={`flex flex-col items-center p-2 cursor-pointer
    transition-all duration-300 ease-out active:scale-95 transition-all duration-150
    ${isActive ? "text-orange-600 scale-110" : "text-gray-700 scale-100"}
  `}
    >
      {cart.length > 0 && (
        <div className="absolute -top-0.5 -right-0.5 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs font-bold p-0.5 ">
          {cart.length}
        </div>
      )}

      <ShoppingCart className="h-6 w-6" />
      <span className="text-xs mt-1">cart</span>
    </button>
  );
};

export default Cart;
