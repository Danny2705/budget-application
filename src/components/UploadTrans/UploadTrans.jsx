import React from "react";
import { useEffect, useState } from "react";
import DragDrop from "./DragDrop";
import FileDisplay from "./FileDisplay";
import JsonDisplay from "./JsonDisplay";
import SaveButton from "./SaveButton";
import { saveReceiptToFirestore } from "../../utils/firebase";
import items from "./items.json";

const UploadTrans = ({ onSetReceiptData, onSetImageURL, onSetTransactionNo }) => {
  //Avoiding using OCR API useState([]) -> useState(items)
  // const [receiptData, setReceiptData] = useState(items);
  //Using OCR API
  const [receiptData, setReceiptData] = useState(items);
  const [imageURL, setImageURL] = useState(null);
  //
  const [receiptNo, setReceiptNo] = useState("U000001B000001T000005");

  const handleImageURLChange = (url) => {
    setImageURL(url);
    console.log("Parent: Image URL", url);
  };

  const handleJsonDataChange = (data) => {
    setReceiptData(data);
    //Avoiding using OCR API onSetReceiptData(data) -> onSetReceiptData(items)
    onSetReceiptData(data);
    console.log("Parent: Receipt Data", receiptData);
    console.log("Parent: Receipt Data", data);
  };

  //Make UploadTrans export receiptData even if OCR has ever been used
  useEffect(() => {
    onSetReceiptData(receiptData);
    onSetImageURL(imageURL);
    onSetTransactionNo(receiptNo);
  }, [receiptData, onSetReceiptData, onSetImageURL, onSetTransactionNo, imageURL, receiptNo]);

  const handleReceiptNoChange = (receiptNo) => {
    setReceiptNo(receiptNo);
  }; 

  // const handleOnClickSaveButton = () => {
  //   console.log("Button data", receiptNo);
  //   saveReceiptToFirestore(
  //     receiptNo,
  //     receiptData,
  //     imageURL
  //     //userEmail,
  //   );
  // };

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
