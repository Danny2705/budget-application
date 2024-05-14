import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../App.scss";

const fileTypes = ["png", "jpeg", "jpg", "pdf"];

const DragDrop = () => {
  const [files, setFile] = useState([]);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className="w-1040 bg-[#D4B4F3] my-[16px] mx-[32px] rounded-[16px] h-[80px] flex justify-center">
      <div className="content-center">
        <div className="dragAndDropFile">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple={false}
            label="Drag & Drop your file here"
          />
        </div>
      </div>
    </div>
  );
};
export default DragDrop;
