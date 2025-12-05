"use client";

import React, {useState} from "react";
import NavBar from "./NavBar";
import Card from "./Card";
export default function Home() {
  const menu = [
    {
      type: "Burger",
      name: "Burger",
      price: 5,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      description: "lorem",
      id:1
    },
    {
      type: "Burger",
      name: "Egg",
      price: 4.5,
      image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
      description: "lorem",
      id:2
    },
    {
      type: "Burger",
      name: "Bacon",
      price: 7,
      image: "",
      description: "lorem",
      id:3
    },
    {
      type: "Extra",
      name: "Fries",
      price: 2,
      image: "",
      description: "lorem",
      id:4
    },
    {
      type: "Extra",
      name: " Soft drink",
      price: 2.5,
      image: "",
      description: "lorem",
      id:5
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(menu);

  const filterItems = number => {
    switch (number) {
      case 1:
        setSelectedCategory(menu.filter(item => item.type === "Burger"));
        break;
      case 2:
        setSelectedCategory(menu.filter(item => item.type === "Extra"));
        break;
      default:
        setSelectedCategory(menu);
        break;
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Our Menu</h2>
        <p className="text-muted-foreground">
          Delicious sandwiches and extras, made fresh daily
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-sm flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M3.75 6h3.75M3.75 12h9.75m3 0h3.75M14.25 18h6M3.75 18h3.75"
            />
          </svg>
          Filter by:
        </span>

        <button className={`px-4 py-1 rounded-full border text-sm transition-all duration-300 ${selectedCategory.length === menu.length && "bg-orange-100 text-orange-700 scale-105"}`} onClick={() => filterItems(3)}>
          All Items
        </button>
        <button className={`px-4 py-1 rounded-full border text-sm transition-all duration-300 ${(selectedCategory.length !== menu.length && selectedCategory[0]["type"]  === "Burger" ) && "bg-orange-100 text-orange-700 scale-105"}`} onClick={() => filterItems(1)} >
          Sandwiches
        </button>
        <button className={`px-4 py-1 rounded-full border text-sm transition-all duration-300 ${(selectedCategory.length !== menu.length && selectedCategory[0]["type"]  === "Extra" ) && "bg-orange-100 text-orange-700 scale-105"}`} onClick={() => filterItems(2)}>
          Extras
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {selectedCategory.map((item, index) => (
          <Card
            key={item.id}
            image={item.image}
            label={item.type}
            title={item.name}
            price={item.price}
            id={item.id}
          />
        ))}
      </div>
    </section>
  );
}
