"use client";

import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { fetchMenu } from "../../lib/menuService";
import FilterButton from "./FilterButton";

export default function Home() {
  //We save the original menu, but we show teh selectedCategory.
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [menu, setMenu] = useState([]);
  const filterItems = number => {
    if (!selectedCategory.length)
      toast.error("Our menu is loading, wait a second please");
    switch (number) {
      case 1:
        setSelectedCategory(menu.filter(item => item.type === "Burger"));
        break;
      case 2:
        setSelectedCategory(menu.filter(item => item.type !== "Burger"));
        break;
      default:
        setSelectedCategory(menu);
        break;
    }
  };
  useEffect(() => {
    fetchMenu().then(data => {
      setMenu(data);
      setSelectedCategory(data);
    });
  }, []);
  return (
    <section className="max-w-7xl mx-auto py-10 px-4 pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Our Menu</h2>
        <p className="text-muted-foreground">
          Delicious sandwiches and extras, made fresh daily
        </p>
      </div>
      {/* By default the selected category will be empty, and when our data "loads" it will be populated */}
      {selectedCategory.length > 0 ? (
        <>
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
            <FilterButton
              isSelected={selectedCategory.length === menu.length}
              handleClick={() => filterItems(3)}
            >
              All
            </FilterButton>
            <FilterButton
              isSelected={
                selectedCategory.length !== menu.length &&
                selectedCategory[0]["type"] === "Burger"
              }
              handleClick={() => filterItems(1)}
            >
              Sandwiches
            </FilterButton>
            <FilterButton
              isSelected={
                selectedCategory.length !== menu.length &&
                selectedCategory[0]["type"] !== "Burger"
              }
              handleClick={() => filterItems(2)}
            >
              Extras
            </FilterButton>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mar ">
            {selectedCategory.map((item, index) => (
              <Card
                key={item.id}
                image={item.image}
                label={item.type}
                title={item.name}
                price={item.price}
                id={item.id}
                type={item.type}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <>
            <div className="fixed inset-0 flex flex-col items-center justify-center gap-4">
              <p className="text-center">
                Our menu is loading, wait a second please
              </p>
              <Loader className="animate-spin w-20 h-20" />
            </div>
          </>
        </>
      )}
    </section>
  );
}
