import React from "react";
import { useState } from "react";
import DragDrop from "./DragDrop";
import FileDisplay from "./FileDisplay";
import JsonDisplay from "./JsonDisplay";
import SaveButton from "./SaveButton";
// import { uploadImageToFirestore } from "";
// import { performOcr } from "../../utils/ocrVeryfi";

const UploadTrans = () => {
  const [receipt, setReceipt] = useState({});
  const [localImage, setLocalImage] = useState("");
  const [fireImageURL, setFireImageURL] = useState(null);
  const [receiptNo, setReceiptNo] = useState([]);

  // const storeAndConvertReceiptImage = async () => {
  //   const { receiptNumber, imageURL } = await uploadImageToFirestore(
  //     localImage
  //   );
  //   setReceiptNo(receiptNumber);
  //   setFireImageURL(imageURL);
  //   console.log("Image uploaded to storage", imageURL);
  //   if (imageURL) {
  //     setReceipt(await performOcr(imageURL));
  //   }
  // };

  return (
    <div className='mt-100 bg-white md:flex flex-col rounded-[24px]'>
      <DragDrop onFileSelect={setLocalImage} />
      <div className='flex flex-row py-[16px] px-[32px]'>
        <FileDisplay />
        <div className='w-[56px]' />
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
