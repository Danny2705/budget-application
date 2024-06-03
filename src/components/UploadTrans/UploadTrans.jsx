import React from "react";
import { useState } from "react";
import DragDrop from "./DragDrop";
import FileDisplay from "./FileDisplay";
import JsonDisplay from "./JsonDisplay";
import SaveButton from "./SaveButton";
// import { uploadImageToFirestore } from "../../utils/firebase";
// import { performOcr } from "../../utils/ocrVeryfi";

const UploadTrans = () => {
  const [receipt, setReceipt] = useState({});
  const [localImage, setLocalImage] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [receiptNo, setReceiptNo] = useState([]);

  const handleImageURLChange = (url) => {
    setImageURL(url);
    console.log("Parent: Image URL", url);
  };

  return (
    <div class="mt-100 bg-white md:flex flex-col rounded-[24px]">
      <DragDrop onSetImageURL={handleImageURLChange}/>
      <div class="flex flex-row py-[16px] px-[32px]">
        <FileDisplay imageSrc={imageURL}/>
        <div class="w-[56px]" />
        <JsonDisplay />
      </div>
      <SaveButton />
    </div>
  );
};

export default UploadTrans;

/* Daily spending container */

// position: absolute;
// width: 1171px;
// height: 801px;
// left: 55px;
// top: 223px;

// background: #FFFFFF;
// border-radius: 24px;
