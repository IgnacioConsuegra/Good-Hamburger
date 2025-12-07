"use client";
import { Toaster } from "react-hot-toast";

import { createContext, useState } from "react";
import { calculateDiscount } from "@/lib/calculateDisCount";
import toast from "react-hot-toast";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [cart, setCart] = useState([]); //{ id, image, title, price, type }
  const [orders, setOrders] = useState([]); // {total, subTotal, percentDiscount, item: [{ id, image, title, price, type }]}
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [percentDiscount, setPercentDiscount] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [userName, setUserName] = useState("");
  const handleDiscounts = currentCart => {
    const { totalPrice, discountPercent, finalPrice } =
      calculateDiscount(currentCart);
    setSubtotal(totalPrice);
    setPriceWithDiscount(finalPrice);
    setPercentDiscount(discountPercent);
  };
  const handleAddToCart = item => {
    if (cart.some(element => element.type === item.type)) {
      toast.error("You can only add one item of each type");
      return;
    }
    const updateCart = [...cart, item];
    setCart(updateCart);
    toast.success("Item added to cart Successfully");
    handleDiscounts(updateCart);
  };
  const handleRemoveFromCart = item => {
    const updatedCart = cart.filter(i => i.id !== item.id);
    setCart(updatedCart);
    toast.success("Item removed from cart Successfully");
    handleDiscounts(updatedCart);
  };
  const handleSubmitOrder = name => {
    const finaleName = name || userName;
    if (!finaleName.length) return;
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setOrders([
      ...orders,
      { total: priceWithDiscount, subTotal, percentDiscount, item: cart },
    ]);
    setCart([]);
    setPriceWithDiscount(0);
    setPercentDiscount(0);
    setSubtotal(0);
    toast.success("Order submitted successfully");
  };
  const handleUserName = text => {
    let name = String(text.trim());
    if (name.length === 0) {
      toast.error("Order canceled");
      return;
    } else {
      setUserName(name);
      handleSubmitOrder(name);
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>

      <UserContext.Provider
        value={{
          cart,
          orders,
          setCart,
          setOrders,
          handleAddToCart,
          priceWithDiscount,
          subTotal,
          percentDiscount,
          handleRemoveFromCart,
          handleSubmitOrder,
          userName,
          handleUserName,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}
