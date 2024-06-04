const FileDisplay = ({ imageSrc }) => {
  return (
    <div className="relative w-[480px] h-[560px] bg-white shadow-2xl rounded-[8px] overflow-y-auto">
      <div className="flex justify-center py-[8px]">
          {imageSrc && <img src={imageSrc} alt="Uploaded receipt" />}
      </div>
    </div>
  );
};
export default FileDisplay;

/* Group 42 */

// position: absolute;
// width: 465px;
// height: 548px;
// left: 105px;
// top: 365px;
