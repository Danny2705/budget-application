const SaveButton = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button className='px-6 py-3 bg-main-neonPink text-white font-semibold rounded-lg shadow-md hover:bg-neon-pink transition duration-300 my-8'
        onClick={onClick}
      >
          Save New Transaction
      </button>
    </div>
  );
};
export default SaveButton;
