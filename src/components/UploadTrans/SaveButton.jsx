const SaveButton = (/*{ onClick }*/) => {
  return (
    <div className='flex justify-center'>
      <button
        /*onClick={onClick}*/ className='bg-[#9EABF1] w-[560px] rounded-[16px] border-[#992189] border-[3px] my-[16px] mx-[32px]'
      >
        <div className="text-black font-['Roboto_Seriff'] font-semibold text-[24px] py-4">
          Save New Transaction
        </div>
      </button>
    </div>
  );
};
export default SaveButton;
