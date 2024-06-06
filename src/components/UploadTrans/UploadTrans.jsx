import React from "react";
import { useState } from "react";
import DragDrop from "./DragDrop";
import FileDisplay from "./FileDisplay";
import JsonDisplay from "./JsonDisplay";
import SaveButton from "./SaveButton";
import { saveReceiptToFirestore } from "../../utils/firebase";

const UploadTrans = () => {
  const [receiptData, setReceiptData] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [receiptNo, setReceiptNo] = useState("");

  const handleImageURLChange = (url) => {
    setImageURL(url);
    console.log("Parent: Image URL", url);
  };

  const handleJsonDataChange = (data) => {
    setReceiptData(data);
    console.log("Parent: Receipt Data", data);
  };

  const handleReceiptNoChange = (receiptNo) => {
    setReceiptNo(receiptNo);
  };

  const handleOnClickSaveButton = () => {
    saveReceiptToFirestore(
      receiptNo,
      receiptData,
      imageURL,
      //userEmail,
    );
  };

  return (
    <div className="mt-100 bg-white md:flex flex-col rounded-[24px]">
      <DragDrop
        onSetImageURL={handleImageURLChange}
        onSetJsonData={handleJsonDataChange}
        onSetTransactionNo={handleReceiptNoChange}
      />
      <div className="flex flex-row py-[16px] px-[32px]">
        <FileDisplay imageSrc={imageURL} />
        <div className="w-[56px]" />
        <JsonDisplay json={receiptData} />
      </div>
      <SaveButton onClick = {handleOnClickSaveButton} />
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
