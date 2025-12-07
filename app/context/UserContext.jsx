"use client";
import { Toaster } from "react-hot-toast";

import { createContext, useEffect, useState } from "react";
import { calculateDiscount } from "@/lib/calculateDisCount";
import toast from "react-hot-toast";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [cart, setCart] = useState([]); //[{ id, image, title, price, type }]
  const [orders, setOrders] = useState([]); // {total, subTotal, percentDiscount, item: [{ id, image, title, price, type }]}
  const [priceData, setPriceData] = useState({
    total: 0,
    subTotal: 0,
    percentDiscount: 0,
  });
  const [userName, setUserName] = useState("");

  //LocalStorage : username, cart, orders, priceData.
  const handleDiscounts = currentCart => {
    const { totalPrice, discountPercent, finalPrice } =
      calculateDiscount(currentCart);
    const changePriceData = {
      total: finalPrice,
      subTotal: totalPrice,
      percentDiscount: discountPercent,
    };
    setPriceData(changePriceData);
    localStorage.setItem("priceData", JSON.stringify(changePriceData));
  };
  const handleAddToCart = item => {
    if (cart.some(element => element.type === item.type)) {
      toast.error("You can only add one item of each type");
      return;
    }
    const updateCart = [...cart, item];
    setCart(updateCart);
    handleDiscounts(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
    toast.success("Item added to cart Successfully");
  };
  const handleRemoveFromCart = item => {
    const updatedCart = cart.filter(i => i.id !== item.id);
    setCart(updatedCart);
    handleDiscounts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart Successfully");
  };
  const handleSubmitOrder = name => {
    const finaleName = name || userName;
    if (!finaleName.length) return;
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const newOrder = [
      ...orders,
      {
        total: priceData.total,
        subTotal: priceData.subTotal,
        percentDiscount: priceData.percentDiscount,
        item: cart,
      },
    ];
    //Adding new order
    setOrders(newOrder);
    localStorage.setItem("orders", JSON.stringify(newOrder));

    //Cleaning, our cart
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    //Reset our dataPrices
    const resetPriceData = {
      total: 0,
      subTotal: 0,
      percentDiscount: 0,
    };
    setPriceData(resetPriceData);
    localStorage.setItem("priceData", JSON.stringify(resetPriceData));

    toast.success("Order submitted successfully");
  };
  const handleUserName = text => {
    let name = String(text.trim());
    if (name.length === 0) {
      toast.error("Order canceled");
      return;
    } else {
      localStorage.setItem("username", JSON.stringify(name));

      setUserName(name);
      handleSubmitOrder(name);
    }
  };

  //checking our localStorage, only when the page loads for the first time..
  useEffect(() => {
    console.log("Running checking localStorage");
    const cart = JSON.parse(localStorage.getItem("cart"));
    const orders = JSON.parse(localStorage.getItem("orders"));
    const priceData = JSON.parse(localStorage.getItem("priceData"));
    const username = JSON.parse(localStorage.getItem("username"));

    if (cart) setCart(cart);
    if (orders) setOrders(orders);
    if (priceData) setPriceData(priceData);
    if (username) setUserName(username);
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>

      <UserContext.Provider
        value={{
          cart,
          orders,
          userName,
          priceData,
          handleAddToCart,
          handleRemoveFromCart,
          handleSubmitOrder,
          handleUserName,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}
