"use client";

import React from "react";
import { List } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Orders = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === "/orders";
  return (
    <button
      onClick={() => router.push("/orders")}
      className={`flex flex-col items-center p-2 cursor-pointer
    transition-all duration-300 ease-out active:scale-95 
    ${isActive ? "text-orange-600 scale-110" : "text-gray-700 scale-100"}
  `}
    >
      <List className="h-6 w-6" />
      <span className="text-xs mt-1">orders</span>
    </button>
  );
};

export default Orders;
