import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiChevronDown,
  FiEdit,
  FiLogOut,
  FiPlusSquare,
  FiShare,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import toast from "react-hot-toast";

const DropDownMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className='flex items-center gap-2 py-2 rounded-md text-indigo-50'
      >
        <span className="font-medium text-sm">
          <img
            src='/gojo.jpeg'
            alt='user avatar'
            className='text-2xl text-main-red duration-500 hover:text-[#da3354] w-9 h-9 rounded-full border border-[#801AE5]'
          />
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="bg-white/0 hover:bg-white/20 duration-150 rounded-full"
        >
          <FiChevronDown />
        </motion.span>
      </button>
      {open && (
        <motion.ul
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          className="absolute top-full right-0 w-48 p-2 bg-white rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="/gojo.jpeg"
              alt="user avatar"
              className="text-2xl text-main-red duration-500 hover:text-[#da3354] w-9 h-9 rounded-full border border-[#801AE5]"
            />
            <div className="flex flex-col">
              <span className="text-black text-sm font-bold">
                {user.displayName}
              </span>
              <span className="text-[grey] text-[11px]">{user.email}</span>
            </div>
          </div>
          <Link to="/profile">
            <MenuItem text="Edit Profile" Icon={FiEdit} />
          </Link>
          <MenuItem text="Create New Budget" Icon={FiPlusSquare} />
          <MenuItem text="Upgrade Plan" Icon={FiShare} />
          <MenuItem text="Log Out" Icon={FiLogOut} handleClick={handleLogOut} />
        </motion.ul>
      )}
    </div>
  );
};

const MenuItem = ({ text, Icon, handleClick }) => {
  return (
    <motion.li
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <Icon />
      <span>{text}</span>
    </motion.li>
  );
};

export default DropDownMenu;
