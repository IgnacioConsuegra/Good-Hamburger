"use client";

import React from "react";
import {List} from "lucide-react";

const Orders = () => {
  return (
    <button>
      <a
        href="#orders"
        className="text-gray-700 flex flex-col items-center p-2"
      >
        <List className="h-6 w-6" />
        <span className="text-xs mt-1">Orders</span>
      </a>
    </button>
  );
};

export default Orders;
