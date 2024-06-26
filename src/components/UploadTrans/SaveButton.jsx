const SaveButton = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button className='px-6 py-3 bg-main-neonPink text-white font-semibold rounded-lg shadow-md hover:bg-neon-pink transition duration-300'
        onClick={onClick}
        // className="bg-[#9EABF1] w-[560px] rounded-[16px] border-[#992189] border-[3px] my-[16px] mx-[32px]"
      >
          Save New Transaction
      </button>
    </div>
  );
};
export default SaveButton;
