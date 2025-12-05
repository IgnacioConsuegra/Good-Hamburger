"use client";

import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <UserContext.Provider value={{ cart, orders, setCart, setOrders }}>
      {children}
    </UserContext.Provider>
  );
}
