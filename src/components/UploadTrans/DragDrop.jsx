import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../App.scss";
import { uploadImageToFirestore } from "../../utils/firebase";
import { useDropzone } from "react-dropzone";
import { performOcr } from "../../utils/ocrVeryfi";
import { Public } from "@mui/icons-material";
import mergeImages from "merge-images";

const fileTypes = ["png", "jpeg", "jpg", "pdf"];

//Refers DragDrop from https://sandydev.medium.com/how-to-create-drag-and-drop-upload-in-reactjs-d2f2c2b2048d
const DragDrop = ({ onSetImageURL, onSetJsonData, onSetTransactionNo }) => {
  const [file, setFile] = useState("");
  const [receiptJsonData, setReceiptJsonData] = useState({});
  const [fireImageURL, setFireImageURL] = useState(null);
  const [transactionNo, setTransactionNo] = useState("");
  const [uploadedFile, setUploadedFile] = useState([]);
  const [imageB64, setImageB64] = useState("");

  //merging the images
  const runMergeImages = async (files) => {
    const urls = files.map(URL.createObjectURL)
    try {
      setImageB64(await mergeImages(urls));
    } catch (error) {
      console.error('error merging images', error)
    } finally {
      urls.forEach(URL.revokeObjectURL)
    }
  };

  useEffect(() => {
    console.log('!!!files', uploadedFile)
    runMergeImages(uploadedFile);
  }, [uploadedFile]);

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
    console.log("Transaction no from Firebase", transactionNumber);

    // Calling OCR Perform Function
    if (imageURL) {
      setReceiptJsonData(await performOcr(imageURL));
      onSetJsonData(await performOcr(imageURL));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "file/pdf": [],
    },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles);
      storeAndConvertReceiptImage(acceptedFiles);
    },
  });

  return (
    <div className="bg-main-neonPink my-[16px] mx-[32px] rounded-[16px] h-[80px] flex justify-center items-center text-white font-semibold hover:bg-neon-pink">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop files here or click to browse.</p>
        {uploadedFile.map((file) => (
          <span key={file.path}>
            {file.path} {(file.size / 1048576).toFixed(2)} MB <br />
          </span>
        ))}
      </div>
      {!!imageB64 && <img src={imageB64} alt="merged" />}
    </div>
  );
};
export default DragDrop;
