import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../App.scss";
import {
  uploadImageToFirestore,
  saveReceiptToFirestore,
} from "../../utils/firebase";
import { useDropzone } from "react-dropzone";
// import { performOcr } from "../../utils/ocrVeryfi";

const fileTypes = ["png", "jpeg", "jpg", "pdf"];

//Refer DragDrop from https://sandydev.medium.com/how-to-create-drag-and-drop-upload-in-reactjs-d2f2c2b2048d
const DragDrop = ({ onSetImageURL }) => {
  const [file, setFile] = useState("");
  const [receipt, setReceipt] = useState({});
  const [fireImageURL, setFireImageURL] = useState(null);
  const [transactionNo, setTransactionNo] = useState("");
  const [uploadedFile, setUploadedFile] = useState([]);

  // Refer from Demo
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
    // if (imageURL) {
    //   setReceipt(await performOcr(imageURL));
    // }
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
