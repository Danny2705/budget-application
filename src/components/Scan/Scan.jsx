import React from "react";
import { motion } from "framer-motion";
import { FiBatteryCharging, FiWifi } from "react-icons/fi";

const Scan = () => {
  return (
    <section className='items-center w-full justify-evenly place-content-center bg-transparent p-2 mt-6 flex flex-wrap gap-4'>
      <ReversedFloatingPhone src='/scan-receipt.png' alt='Scan Receipt Phone' />
      <FloatingPhone />
    </section>
  );
};

const ReversedFloatingPhone = ({ src, alt }) => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(30deg) rotateX(-15deg)",
      }}
      className='rounded-[24px] bg-violet-500'
    >
      <motion.div
        initial={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        animate={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className='relative h-96 w-56 rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]'
      >
        <HeaderBar />
        <ImageScreen src={src} alt={alt} />
      </motion.div>
    </div>
  );
};

const ImageScreen = ({ src, alt }) => {
  return (
    <div className='relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-white'>
      <img
        src={src}
        alt={alt}
        className='h-full w-full object-cover rounded-[20px]'
      />
    </div>
  );
};

const FloatingPhone = () => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className='rounded-[24px] bg-violet-500'
    >
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className='relative h-96 w-56 rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]'
      >
        <HeaderBar />
        <Screen />
      </motion.div>
    </div>
  );
};

const HeaderBar = () => {
  return (
    <>
      <div className='absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-neutral-900'></div>
      <div className='absolute right-3 top-2 z-10 flex gap-2'>
        <FiWifi className='text-neutral-600' />
        <FiBatteryCharging className='text-neutral-600' />
      </div>
    </>
  );
};

const Screen = () => {
  return (
    <div className='relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-white'>
      <div className='absolute inset-0 flex items-center justify-center p-4'>
        <p className='text-center text-xl font-poppins text-violet-500'>
          Looking for a new way of uploading receipt and bill into budget
          application?
        </p>
      </div>
      <button className='absolute bottom-4 left-4 right-4 z-10 rounded-lg border-[1px] bg-violet-500 py-2 text-sm font-medium text-white backdrop-blur'>
        Visit
      </button>
      <div className='absolute -bottom-72 left-[50%] h-96 w-96 -translate-x-[50%] rounded-full bg-violet-500' />
    </div>
  );
};

export default Scan;
