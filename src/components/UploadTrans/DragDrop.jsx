import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../App.scss";
import {
  uploadImageToFirestore,
  saveReceiptToFirestore,
} from "../../utils/firebase";
import { useDropzone } from "react-dropzone";
import { performOcr } from "../../utils/ocrVeryfi";

const fileTypes = ["png", "jpeg", "jpg", "pdf"];

const DragDrop = ({ userEmail }) => {
  const [file, setFile] = useState("");
  const [receipt, setReceipt] = useState({});
  const [fireImageURL, setFireImageURL] = useState(null);
  const [transactionNo, setTransactionNo] = useState("");
  // todo: rename to singular
  const [uploadedFile, setUploadedFile] = useState([]);

  const storeAndConvertReceiptImage = async () => {
    // uploadImageToFirestore(localImage) return { transactionNumber, imageURL }
    const { transactionNumber, imageURL } = await uploadImageToFirestore(
      uploadedFile
    );
    setTransactionNo(transactionNumber);
    setFireImageURL(imageURL);
    console.log("Image uploaded to storage", imageURL);
    if (imageURL) {
      setReceipt(await performOcr(imageURL));
    }
  };

  const { getRootProps, getInputProps } = useDropzone(
    {
    accept: {
      'image/jpeg': [],
      'image/png': []
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
        {/* <ul>
          {uploadedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};
export default DragDrop;
