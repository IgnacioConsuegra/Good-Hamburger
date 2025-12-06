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
    transition-all duration-300 ease-out
    ${isActive ? "text-orange-600 scale-110" : "text-gray-700 scale-100"}
  `}
    >
      <ShoppingCart className="h-6 w-6" />
      <span className="text-xs mt-1">cart</span>
    </button>
  );
};

export default Cart;
