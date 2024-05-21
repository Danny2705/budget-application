import React, { useState } from "react";
import Links from "./Links/Links";
import { Link, useNavigate } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { VARIANTS } from "../../utils/Variants";

export default function Navbar({ scroll }) {
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      } flex items-center bg-transparent text-white h-[50px] px-4 justify-between fixed top-3 left-0 right-0 z-20 py-10`}
    >
      <Link to={"/"}>
        <h1 className='text-lg'>Budget Tracker</h1>
      </Link>
      <div className='h-full hidden md:flex'>
        <Links />
      </div>
      <div className='flex items-center gap-4 h-full'>
        <DropDownMenu />
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
            className='relative h-10 w-10 rounded-full bg-white/0 transition-colors hover:bg-white/20 z-20 block md:hidden'
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
      >
        <div className='w-full h-full flex flex-col justify-between '>
          <Link to={"/"}>
            <h1 className='text-2xl'>Budget Tracker</h1>
          </Link>

          <div className='space-y-6 p-12 pl-4 md:pl-20 flex flex-col items-start'>
            <Link
              to='/'
              className='text-link duration-150 text-[2.5rem] md:text-7xl font-poppins font-semibold hover:text-indigo-800 block w-full'
              style={{ opacity: 1, transform: "none" }}
              onClick={toggleMenu}
            >
              home.
            </Link>
            <Link
              to='/transaction'
              className='text-link duration-150 text-[2.5rem] md:text-7xl font-poppins font-semibold hover:text-indigo-800 block w-full'
              style={{ opacity: 1, transform: "none" }}
              onClick={toggleMenu}
            >
              transaction.
            </Link>
            <Link
              to='/budget'
              className='text-link duration-150 text-[2.5rem] md:text-7xl font-poppins font-semibold hover:text-indigo-800 block w-full'
              style={{ opacity: 1, transform: "none" }}
              onClick={toggleMenu}
            >
              budget.
            </Link>
            <Link
              to='/profile'
              className='text-link duration-150 text-[2.5rem] md:text-7xl font-poppins font-semibold hover:text-indigo-800 block w-full'
              style={{ opacity: 1, transform: "none" }}
              onClick={toggleMenu}
            >
              profile.
            </Link>
            <button
              onClick={handleLogOut}
              className='text-link duration-150 text-[2.5rem] md:text-7xl font-poppins font-semibold hover:text-indigo-800 block w-fit'
              style={{ opacity: 1, transform: "none" }}
            >
              logout.
            </button>
          </div>

          <div className='flex gap-4 justify-start md:flex-col'>
            <FaInstagram
              size={30}
              className='hover:text-indigo-800 duration-150 cursor-pointer'
            />
            <FaLinkedin
              size={30}
              className='hover:text-indigo-800 duration-150 cursor-pointer'
            />
            <FaGithub
              size={30}
              className='hover:text-indigo-800 duration-150 cursor-pointer'
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
