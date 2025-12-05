"use client";

import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userName, setUserName] = useState("Ignacio");

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
