import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
// Using hover.dev library for the modal here
const Confirmation = ({ isOpen, setIsOpen, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className='bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[100] grid place-items-center overflow-y-scroll cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className='bg-gradient-to-br  from-purple-500 via-pink-500 to-red-500 text-black p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden'
          >
            <FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />
            <div className='relative z-10'>
              <div className='bg-white w-16 h-16 mb-2 rounded-full text-3xl text-main-neonPink grid place-items-center mx-auto'>
                <FiAlertCircle />
              </div>
              <h3 className='text-3xl font-bold text-center mb-2'>
                Are you sure you want to delete this Budget?
              </h3>
              <p className='text-center mb-6'>
                If you delete this budget, all the transactions and data will be
                lost.
              </p>
              <div className='flex gap-2'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='bg-transparent hover:bg-white/10 transition-colors text-  font-semibold w-full py-2 rounded'
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className='bg-white hover:opacity-90 transition-opacity text-main-neonPink hover:bg-pink-400 duration-300 hover:text-white font-semibold w-full py-2 rounded'
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Confirmation;
