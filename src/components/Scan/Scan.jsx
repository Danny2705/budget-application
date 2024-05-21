import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Scan() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xRange = [-100, 100];
  const yRange = [-100, 100];
  const rotateX = useTransform(mouseY, yRange, [20, -20]);
  const rotateY = useTransform(mouseX, xRange, [-20, 20]);

  const handleMouseMove = (event) => {
    mouseX.set(event.clientX - window.innerWidth / 2);
    mouseY.set(event.clientY - window.innerHeight / 2);
  };

  return (
    <div
      className='flex flex-col items-center mt-6'
      onMouseMove={handleMouseMove}
    >
      <div className='bg-purple-200 p-6 mb-6 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center text-purple-800'>
          Intelligent OCR Technology
        </h1>
      </div>

      <div className='flex gap-10 items-center'>
        <motion.div
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
          className='w-[350px] h-[700px] flex justify-center items-center'
        >
          <motion.img
            src='/scan-receipt.png'
            alt='phone scanning receipt'
            className='w-full h-full object-cover'
            style={{
              rotateX,
              rotateY,
              willChange: "transform",
              transition: {
                type: "spring",
                damping: 10,
                stiffness: 100,
              },
            }}
          />
        </motion.div>
        <div className='relative w-[350px] h-[700px]'>
          <img
            src='/phone.png'
            alt='Iphone frame'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 flex items-start top-[7rem] left-5'>
            <p className='px-8 text-[2.5rem] font-poppins h-full'>
              Looking for a new way of uploading receipt and bill into budget
              application?
            </p>
          </div>
          <button className='px-8 bottom-[6.5rem] left-[5rem] w-[50%] bg-[#6859C9] font-poppins absolute p-1 rounded-full text-white text-lg'>
            Visit
          </button>
        </div>
      </div>
    </div>
  );
}
