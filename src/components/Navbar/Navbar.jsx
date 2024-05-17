import React, { useState } from "react";
import Links from "./Links/Links";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MotionConfig, motion } from "framer-motion";
import { VARIANTS } from "../../utils/Variants";

// TODO: Logo component for import, contains error
// import {ReactComponent as Logo} from ""

export default function Navbar({ scroll }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Log out successfully");
    navigate("/login");
  };

  const toggleMenu = () => {
    setActive((prevState) => !prevState);
  };

  return (
    <div
      className={`navbar ${
        scroll > 50 ? "scrolled" : undefined
      } flex items-center bg-transparent text-white h-[50px] px-4 justify-between fixed top-3 left-0 right-0 z-20`}
    >
      <Link to={"/"}>
        <h1 className='text-lg'>no name</h1>
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

        <MotionConfig
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <motion.button
            initial={false}
            animate={active ? "open" : "closed"}
            onClick={toggleMenu}
            className='relative h-10 w-10 rounded-full bg-white/0 transition-colors hover:bg-white/20 z-20'
          >
            <motion.span
              variants={VARIANTS.top}
              className='absolute h-[0.1rem] w-6 bg-white'
              style={{ y: "-50%", left: "50%", x: "-50%", top: "25%" }}
            />
            <motion.span
              variants={VARIANTS.middle}
              className='absolute h-[0.1rem] w-6 bg-white'
              style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
            />
            <motion.span
              variants={VARIANTS.bottom}
              className='absolute h-[0.1rem] w-3 bg-white'
              style={{
                x: "-50%",
                y: "50%",
                bottom: "25%",
                left: "calc(50% + 5px)",
              }}
            />
          </motion.button>
        </MotionConfig>
      </div>

      {/* Corner navigation menu */}
      <motion.div
        initial='closed'
        animate={active ? "open" : "closed"}
        variants={VARIANTS.cornerMenu}
        className='fixed h-screen top-0 right-0 bottom-0 left-0 bg-gradient-to-br from-violet-500 to-indigo-500 z-10 p-8'
        style={{ clipPath: "circle(0px at 100% 0)" }}
      >
        <div className='flex items-start space-y-6 h-full'>
          <div>
            <Link to={"/"}>
              <h1 className='text-lg'>Budget Tracker</h1>
            </Link>
          </div>
          <div>
            <Link to='/' className='text-white text-lg' onClick={toggleMenu}>
              Home
            </Link>
            <Link to='/transaction' className='text-white text-lg'>
              Transaction Management
            </Link>
            <Link to='/budget' className='text-white text-lg'>
              BUdget Management
            </Link>
            <Link to='/profile' className='text-white text-lg'>
              Profile
            </Link>
            <button onClick={handleLogOut} className='text-white text-lg'>
              Logout
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
