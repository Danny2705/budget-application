import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../App.scss";
import { uploadImageToFirestore } from "../../utils/firebase";
import { useDropzone } from "react-dropzone";
// import { performOcr } from "../../utils/ocrVeryfi";

const fileTypes = ["png", "jpeg", "jpg", "pdf"];

//Refers DragDrop from https://sandydev.medium.com/how-to-create-drag-and-drop-upload-in-reactjs-d2f2c2b2048d
const DragDrop = ({ onSetImageURL, onSetJsonData }) => {
  const [file, setFile] = useState("");
  const [receiptJsonData, setReceiptJsonData] = useState({});
  const [fireImageURL, setFireImageURL] = useState(null);
  const [transactionNo, setTransactionNo] = useState("");
  const [uploadedFile, setUploadedFile] = useState([]);

  // Refers from Demo
  const storeAndConvertReceiptImage = async () => {
    // uploadImageToFirestore(localImage) return { transactionNumber, imageURL }
    const { transactionNumber, imageURL } = await uploadImageToFirestore(
      uploadedFile
    );
    setTransactionNo(transactionNumber);
    setFireImageURL(imageURL);
    onSetImageURL(imageURL);
    console.log("Image uploaded to storage", imageURL);

    // Calling OCR Perform Function
    //   if (imageURL) {
    //     setReceiptJsonData(await performOcr(imageURL));
    //   }
    // onSetJsonData(receiptJsonData);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles[0]);
      storeAndConvertReceiptImage();
    },
  });

  return (
    <div className="w-1040 bg-[#D4B4F3] my-[16px] mx-[32px] rounded-[16px] h-[80px] flex justify-center">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop files here or click to browse.</p>
        <span>{uploadedFile.name}</span>
      </div>
    </div>
  );
};
export default DragDrop;
