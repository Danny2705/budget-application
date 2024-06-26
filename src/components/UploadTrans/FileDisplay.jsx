//Refers from Demo
const FileDisplay = ({ imageSrc }) => {
  return (
    <div className="relative w-[560px] h-[560px] bg-gray-300 shadow-2xl rounded-[8px] overflow-y-auto">
      <div className="flex justify-center py-[8px]">
          {imageSrc && <img src={imageSrc} alt="Uploaded receipt" />}
      </div>
    </div>
  );
};
export default FileDisplay;

