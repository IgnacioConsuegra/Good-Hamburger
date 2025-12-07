import { Trash2 } from "lucide-react";
import Image from "next/image";

import React from "react";

const CartItem = ({ item, handleRemoveFromCart }) => {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            width={80}
            height={80}
            className="w-full h-full  object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 mb-1">{item.title}</h4>
          <p className="text-orange-600">${item.price.toFixed(2)}</p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => handleRemoveFromCart(item)}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
