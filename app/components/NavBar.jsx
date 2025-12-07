"use client";

import React from "react";
import Cart from "./Cart";
import Orders from "./Orders";
import Menu from "./Menu";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center lg:justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="shrink-0 flex items-center">
                <span
                  className="text-xl font-bold text-orange-600 cursor-pointer"
                  onClick={() => router.push("/home")}
                >
                  GOOD HAMBURGER
                </span>
              </div>
            </div>

            <div className="hidden lg:ml-4 lg:flex lg:items-center">
              <Cart />
              <Orders />
            </div>
          </div>
        </div>
      </nav>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-xl border-t border-gray-200 lg:hidden z-20">
        <div className="flex justify-around items-center h-full">
          <Menu />
          <Cart />
          <Orders />
        </div>
      </div>
    </>
  );
};

export default NavBar;
