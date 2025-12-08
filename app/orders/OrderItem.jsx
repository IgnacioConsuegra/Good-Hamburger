"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const OrderItem = ({ order }) => {
  //{total, subTotal, percentDiscount item: [{ id, image, title, price, type }]}
  const [open, setOpen] = useState(false);

  const summarizedItems =
    order.item
      .map(i => i.title)
      .join(", ")
      .slice(0, 25) + "...";

  return (
    <div
      className="bg-white rounded-2xl shadow p-4 mb-4 transition-all px-4 py-1   text-sm duration-300 
    active:scale-95 active:opacity-80  "
    >
      {/* --- COMPACT VIEW (always visible) --- */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-col">
          <div className="flex justify-  cursor-pointer">
            <p className="font-semibold text-gray-900">
              Total: ${order.total.toFixed(2)}
            </p>
          </div>
          <p className="text-gray-500 text-sm">Items: {summarizedItems}</p>
        </div>

        {open ? (
          <ChevronUp className="text-gray-700" />
        ) : (
          <ChevronDown className="text-gray-700" />
        )}
      </div>

      {/* --- DETAILS (only when open) --- */}
      {open && (
        <div className="mt-4 border-t pt-4 space-y-4">
          <p className="font-medium text-gray-900 px-1">
            {order.time.day}/{order.time.month}/{order.time.year} at{" "}
            {order.time.hour}:{order.time.minute.toString().padStart(2, "0")}
          </p>
          {order.item.map(product => (
            <div key={product.id} className="flex gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-medium text-gray-900">{product.title}</p>

                <p className="text-orange-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}

          {/* ORDER SUMMARY */}
          <div className="pt-4 border-t text-sm text-gray-700">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subTotal.toFixed(2)}</span>
            </p>

            {order.percentDiscount > 0 && (
              <p className="flex justify-between text-green-600">
                <span>Discount {order.percentDiscount}% off</span>
                <span>
                  - $
                  {((order.subTotal * order.percentDiscount) / 100).toFixed(2)}
                </span>
              </p>
            )}

            <p className="flex justify-between font-semibold mt-2 text-gray-900">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
