"use client";

import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart } = useContext(UserContext);
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/cart")}
      className="text-gray-700 flex flex-col items-center p-2 cursor-pointer"
    >
      <ShoppingCart className="h-6 w-6" />
      <span className="text-xs mt-1">cart</span>
    </button>
  );
};

export default Cart;
