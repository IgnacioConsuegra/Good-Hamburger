"use client";

import React from "react";
import { List } from "lucide-react";
import { useRouter } from "next/navigation";

const Orders = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/orders")}
      className="text-gray-700 flex flex-col items-center p-2 cursor-pointer"
    >
      <List className="h-6 w-6" />
      <span className="text-xs mt-1">orders</span>
    </button>
  );
};

export default Orders;
