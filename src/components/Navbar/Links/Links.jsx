import { useState } from "react";
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
            ? "border-b-2 border-purple-500 text-purple-500"
            : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
        } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
      >
        Home
      </Link>
      <Link
        to='/transaction'
        onClick={() => handleSelect("/transaction")}
        className={`${
          selected === "/transaction"
            ? "border-b-2 border-purple-500 text-purple-500"
            : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
        } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
      >
        Transaction
      </Link>
      <Link
        to='/budget'
        onClick={() => handleSelect("/budget")}
        className={`${
          selected === "/budget"
            ? "border-b-2 border-purple-500 text-purple-500"
            : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
        } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
      >
        Budget Management
      </Link>
    </div>
  );
};

export default Links;
