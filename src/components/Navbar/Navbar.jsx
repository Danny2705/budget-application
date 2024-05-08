import React from "react";
import Links from "./Links/Links";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar({ scroll }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Log out successfully");
    navigate("/login");
  };

  return (
    <div
      className={`navbar ${
        scroll > 50 ? "scrolled" : undefined
      } flex items-center bg-transparent text-white h-[50px] px-4 justify-between fixed top-3 left-0 right-0`}
    >
      <Link to={"/dashboard"}>
        <h1 className='text-lg'>Budget Tracker</h1>
      </Link>
      <div className='h-full'>
        <Links />
      </div>
      <div className='flex items-center gap-4 h-full'>
        <button onClick={handleLogOut}>Logout</button>
        <img
          src='/gojo.jpeg'
          alt='user avatar'
          className='text-2xl text-main-red duration-500 hover:text-[#da3354] w-9 h-9 rounded-full border border-[#801AE5]'
        />
      </div>
    </div>
  );
}
