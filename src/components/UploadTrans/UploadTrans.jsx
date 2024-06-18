import React from "react";
import { useEffect, useState } from "react";
import DragDrop from "./DragDrop";
import FileDisplay from "./FileDisplay";
import JsonDisplay from "./JsonDisplay";
import SaveButton from "./SaveButton";
import { saveReceiptToFirestore } from "../../utils/firebase";
import items from "./items.json";

const UploadTrans = ({ onSetReceiptData }) => {
  //Avoiding using OCR API useState([]) -> useState(items)
  const [receiptData, setReceiptData] = useState(items);
  const [imageURL, setImageURL] = useState(null);
  const [receiptNo, setReceiptNo] = useState("");

  const handleImageURLChange = (url) => {
    setImageURL(url);
    console.log("Parent: Image URL", url);
  };

  const handleJsonDataChange = (data) => {
    setReceiptData(data);
    //Avoiding using OCR API onSetReceiptData(data) -> onSetReceiptData(items)
    //onSetReceiptData(data);
    console.log("Parent: Receipt Data", receiptData);
    console.log("Parent: Receipt Data", data);
  };

  //Make UploadTrans export receiptData even if OCR has ever been used
  useEffect(() => {
    onSetReceiptData(receiptData);
  }, [receiptData, onSetReceiptData]);

  const handleReceiptNoChange = (receiptNo) => {
    setReceiptNo(receiptNo);
  };

  const handleOnClickSaveButton = () => {
    saveReceiptToFirestore(
      receiptNo,
      receiptData,
      imageURL
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
      <SaveButton onClick={handleOnClickSaveButton} />
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
