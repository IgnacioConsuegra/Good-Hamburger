import React from "react";
import { Menu as MyMenu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === "/home";
  return (
    <button
      onClick={() => router.push("/home")}
      className={`flex flex-col items-center p-2 cursor-pointer
    transition-all duration-300 ease-out
    ${isActive ? "text-orange-600 scale-110" : "text-gray-700 scale-100"}
  `}
    >
      <MyMenu className="h-6 w-6" />
      <span className="text-xs mt-1">Menu</span>
    </button>
  );
};

export default Menu;
