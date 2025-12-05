import React from "react";
import {Menu as MyMenu} from "lucide-react";

const Menu = () => {
  return (
    <button>
      <a
        href="#menu"
        className="text-orange-600 flex flex-col items-center p-2"
      >
        <MyMenu className="h-6 w-6" />
        <span className="text-xs mt-1">Menu</span>
      </a>
    </button>
  );
};

export default Menu;
