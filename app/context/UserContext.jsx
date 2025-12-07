"use client";
import { Toaster } from "react-hot-toast";

import { createContext, use, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [cart, setCart] = useState([]); //{ id, image, title, price, type }
  const [orders, setOrders] = useState([]);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [percentDiscount, setPercentDiscount] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const handleDiscounts = currentCart => {
    const hasSandwich = currentCart.some(i => i.type === "Burger");
    const hasFries = currentCart.some(i => i.type === "Fries");
    const hasDrink = currentCart.some(i => i.type === "Drink");

    // Normal price
    const totalPrice = currentCart.reduce(
      (accumulated, currentItem) => accumulated + currentItem.price,
      0
    );
    setSubtotal(totalPrice);
    let discount = 0;

    // Rule 1: sandwich + fries + drink → 20%
    if (hasSandwich && hasFries && hasDrink) {
      discount = 0.2;
    }
    // Rule 2: sandwich + drink → 15%
    else if (hasSandwich && hasDrink) {
      discount = 0.15;
    }
    // Rule 3: sandwich + fries → 10%
    else if (hasSandwich && hasFries) {
      discount = 0.1;
    }

    const finalPrice = totalPrice - totalPrice * discount;
    setPriceWithDiscount(finalPrice);
    setPercentDiscount(discount * 100);
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
  const handleSubmitOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setOrders([...orders, cart]);
    setCart([]);
    setPriceWithDiscount(0);
    setPercentDiscount(0);
    setSubtotal(0);
    toast.success("Order submitted successfully");
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
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}
