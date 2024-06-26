import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../App.scss";
import { uploadImageToFirestore } from "../../utils/firebase";
import { useDropzone } from "react-dropzone";
import { performOcr } from "../../utils/ocrVeryfi";

const fileTypes = ["png", "jpeg", "jpg", "pdf"];

//Refers DragDrop from https://sandydev.medium.com/how-to-create-drag-and-drop-upload-in-reactjs-d2f2c2b2048d
const DragDrop = ({ onSetImageURL, onSetJsonData, onSetTransactionNo }) => {
  const [file, setFile] = useState("");
  const [receiptJsonData, setReceiptJsonData] = useState({});
  const [fireImageURL, setFireImageURL] = useState(null);
  const [transactionNo, setTransactionNo] = useState("");
  const [uploadedFile, setUploadedFile] = useState([]);

  // Refers from Demo
  const storeAndConvertReceiptImage = async (droppedfile) => {
    // uploadImageToFirestore(localImage) return { transactionNumber, imageURL }
    const { transactionNumber, imageURL } = await uploadImageToFirestore(
      droppedfile
    );
    setTransactionNo(transactionNumber);
    setFireImageURL(imageURL);
    onSetImageURL(imageURL);
    onSetTransactionNo(transactionNo);
    console.log("Image uploaded to storage", imageURL);

    // Calling OCR Perform Function
      if (imageURL) {
        setReceiptJsonData(await performOcr(imageURL));
        onSetJsonData(await performOcr(imageURL));
      }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles[0]);
      storeAndConvertReceiptImage(acceptedFiles[0]);
    },
  });

  return (
    <div className="bg-main-neonPink my-[16px] mx-[32px] rounded-[16px] h-[80px] flex justify-center items-center text-white font-semibold hover:bg-neon-pink">
      <div {...getRootProps()} >
        <input {...getInputProps()} />
        <p>Drag and drop files here or click to browse.</p>
        <span >{uploadedFile.name}</span>
      </div>
    </div>
  );
};
export default DragDrop;
