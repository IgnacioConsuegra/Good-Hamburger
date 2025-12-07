"use client";

import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Image from "next/image";

const Card = ({ image, label, title, price, id, type }) => {
  const { handleAddToCart } = useContext(UserContext);
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 right-3 bg-white text-xs px-2 py-1 rounded shadow">
          {label}
        </span>
      </div>
      <div className="p-4">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground mb-4">${price}</p>
        <button
          className="
    w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl shadow-lg 
    flex items-center justify-center gap-2 cursor-pointer 
    active:scale-95 active:shadow-inner transition-all duration-150
  "
          onClick={() => handleAddToCart({ id, image, title, price, type })}
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
