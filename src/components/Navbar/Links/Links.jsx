import { useState } from "react";
import { Link } from "react-router-dom";

const Links = () => {
  const [selected, setSelected] = useState("Home");

  return (
    <div className='flex items-center gap-8 h-full px-4 rounded-full'>
      <Tab
        title='Home'
        path='/'
        selected={selected === "Home"}
        handleClick={() => setSelected("Home")}
      />
      <Tab
        title='Transaction'
        path='/transaction'
        selected={selected === "Transaction"}
        handleClick={() => setSelected("Transaction")}
      />
      <Tab
        title='Budget'
        path='/budget'
        selected={selected === "Budget"}
        handleClick={() => setSelected("Budget")}
      />
    </div>
  );
};

const Tab = ({ title, path, selected, handleClick }) => {
  return (
    <Link
      to={path}
      onClick={handleClick}
      className={`${
        selected
          ? "border-b-2 border-purple-500 text-purple-500"
          : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      {title}
    </Link>
  );
};

export default Links;
