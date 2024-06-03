import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Links = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const handleSelect = (path) => {
    setSelected(path);
  };

  return (
    <div className='flex items-center gap-8 h-full px-4 rounded-full'>
      <Link
        to='/'
        onClick={() => handleSelect("/")}
        className={`${
          selected === "/"
            ? "border-b-2 border-main-neonPink shadow-top-md text-main-neonPink"
            : "text-white hover:text-main-neonPink"
        } text-lg transition-colors px-2.5 py-0.5 font-medium rounded-md relative`}
      >
        Home
      </Link>

      <Link
        to='/budget'
        onClick={() => handleSelect("/budget")}
        className={`${
          selected === "/budget"
            ? "border-b-2 border-main-neonPink shadow-top-md text-main-neonPink"
            : "text-white hover:text-main-neonPink"
        } text-lg transition-colors px-2.5 py-0.5 font-medium rounded-md relative`}
      >
        Budget Management
      </Link>

      <Link
        to='/about'
        onClick={() => handleSelect("/about")}
        className={`${
          selected === "/about"
            ? "border-b-2 border-main-neonPink shadow-top-md text-main-neonPink"
            : "text-white hover:text-main-neonPink"
        } text-lg transition-colors px-2.5 py-0.5 font-medium rounded-md relative`}
      >
        About
      </Link>
    </div>
  );
};

export default Links;
