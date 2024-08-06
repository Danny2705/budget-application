import React from "react";
import { useEffect, useState } from "react";
import DragDrop from "./DragDrop";
import FileDisplay from "./FileDisplay";
import JsonDisplay from "./JsonDisplay";
import SaveButton from "./SaveButton";
import { saveReceiptToFirestore } from "../../utils/firebase";
import items from "./items.json";
import { set } from "date-fns";

const UploadTrans = ({
  onSetReceiptData,
  onSetImageURL,
  onSetTransactionNo,
  onSetReceipWAllInfo,
  budgetID,
  setLoading,
}) => {
  //Avoiding using OCR API useState([]) -> useState(items)
  // const [receiptData, setReceiptData] = useState(items);
  //Using OCR API
  const [receiptData, setReceiptData] = useState();
  const [imageURL, setImageURL] = useState(null);
  const [receiptNo, setReceiptNo] = useState("");
  const [receiptWAllInfo, setReceiptWAllInfo] = useState([{}]);
  const [pdfFiles, setPDFFiles] = useState([]);

  const handleImageURLChange = (url) => {
    setImageURL(url);
    onSetImageURL(url);
    setReceiptData(undefined);
    setLoading(true);
    console.log("ImageURLChange", url);
  };

  const handleJsonDataChange = (data) => {
    setReceiptData(data);
    onSetReceiptData(data);
    setLoading(false);
    console.log("receiptDataChange", receiptData);
  };

  const handleReceiptNoChange = (receiptNo) => {
    setReceiptNo(receiptNo);
    onSetTransactionNo(receiptNo);
    console.log("receiptNoChange", receiptNo);
  };

  const handleReceiptWAllInfo = (receiptWAllInfo) => {
    setReceiptWAllInfo(receiptWAllInfo);
    onSetReceipWAllInfo(receiptWAllInfo);
    console.log("receiptWAllInfo from uploadTrans comp", receiptWAllInfo);
  };

  const handlePDFFiles = (pdfFiles) => {
    setPDFFiles(pdfFiles);
    console.log("PDF Files in UploadTrans", pdfFiles);
  };

  return (
    <div className='p-(32px) bg-[#2c0b31] md:flex flex-col rounded-[24px] border border-main-neonPink'>
      <DragDrop
        onSetImageURL={handleImageURLChange}
        onSetJsonData={handleJsonDataChange}
        onSetTransactionNo={handleReceiptNoChange}
        onSetReceipWAllInfo={handleReceiptWAllInfo}
        budgetID={budgetID}
        onSetPDFFiles={handlePDFFiles}
      />
      <div className='flex flex-row py-[16px] px-[32px] space-x-20'>
        <FileDisplay fileUrl={imageURL} pdfFiles={pdfFiles}/>
        <JsonDisplay
          json={receiptWAllInfo}
          loading={!!imageURL && !receiptWAllInfo}

        />
      </div>
    </div>
  );
};

export default UploadTrans;
