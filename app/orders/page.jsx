"use client";

import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/UserContext";
import { Package, Trash2, Tag, ArrowRight } from "lucide-react";
import OrderItem from "./OderItem";

export default function CartPage() {
  const { orders, userName } = useContext(UserContext);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Order History</h2>
        <p className="text-gray-600">
          View all your previous orders {userName}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-md">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500">Your order history will appear here</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
            <div className="divide-y divide-gray-100">
              <div className="p-4">
                {orders.map((order, index) => (
                  <OrderItem key={index} order={order} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
