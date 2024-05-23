import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const paths = ["/", "/transaction", "/budget"];
const Links = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const handleSelect = (path) => {
    setSelected(path);
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -10 },
    selected: { y: -10 },
  };

  const linkTransition = {
    type: "spring",
    stiffness: 200,
    damping: 30,
  };

  return (
    <div className='flex items-center gap-8 h-full px-4 rounded-full'>
      {paths.map((path) => (
        <Link
          key={path}
          to={path}
          onClick={() => handleSelect(path)}
          className={`${
            selected === path
              ? "border-b-2 border-main-neonPink shadow-md shadow-main-neonPink text-main-neonPink"
              : "text-white hover:text-main-neonPink"
          } text-sm transition-colors px-2.5 py-0.5 font-medium rounded-md relative`}
        >
          <motion.div
            initial='initial'
            whileHover={selected === path ? "selected" : "hover"}
            animate={selected === path ? "selected" : "initial"}
            variants={linkVariants}
            transition={linkTransition}
          >
            {path === "/"
              ? "Home"
              : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default Links;
