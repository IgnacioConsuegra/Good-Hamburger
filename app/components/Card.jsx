"use client";

import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Card = ({ image, label, title, price, id }) => {
  const { cart, setCart } = useContext(UserContext);
  const handleAddToCart = () => {
    setCart([...cart, id]); 
  };
  return (
    <div
      className="border rounded-xl overflow-hidden shadow-sm"
      onClick={handleAddToCart}
    >
      <div className="relative">
        <img
          src={image || null}
          alt={title}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 right-3 bg-white text-xs px-2 py-1 rounded shadow">
          {label}
        </span>
      </div>
      <div className="p-4">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground mb-4">{price}</p>
        <button className="w-full bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
          + Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
