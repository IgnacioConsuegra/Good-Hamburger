"use client";

import React from "react";

const Card = ({ image, label, title, price }) => (
    <div className="border rounded-xl overflow-hidden shadow-sm">
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

  export default Card;