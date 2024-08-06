import React, { useEffect, useState } from "react";
import "../../App.scss";
import { uploadImageToFirestore } from "../../utils/firebase";
import { useDropzone } from "react-dropzone";
import { performOcr } from "../../utils/ocrVeryfi";
import mergeImages from "merge-images";
import { auth } from "../../utils/firebase";

const fileTypes = ["png", "jpeg", "jpg", "pdf"];

//Refers DragDrop from https://sandydev.medium.com/how-to-create-drag-and-drop-upload-in-reactjs-d2f2c2b2048d
const DragDrop = ({
  onSetImageURL,
  onSetJsonData,
  onSetTransactionNo,
  budgetID,
  onSetReceipWAllInfo,
  onSetPDFFiles,
}) => {
  const [receiptJsonData, setReceiptJsonData] = useState({});
  const [fireImageURL, setFireImageURL] = useState(null);
  const [receiptWBgtTransNo, setReceiptWBgtTransNo] = useState([{}]);
  const [receiptWFirebaseURL, setReceiptWFirebaseURL] = useState([{}]);
  const [receiptWAllInfo, setReceiptWAllInfo] = useState([{}]);
  const [transactionNo, setTransactionNo] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageB64, setImageB64] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);

  //merging the images
  //https://www.npmjs.com/package/merge-images
  const runMergeImages = async (files) => {
    const urls = files.map(URL.createObjectURL);
    console.log("runMergeImages files", files);
    console.log("runMergeImages urls", urls);
    try {
      //https://stackoverflow.com/questions/623172/how-to-get-the-image-size-height-width-using-javascript
      const imageHeights = await Promise.all(
        urls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              resolve(img.height);
            };
            img.onerror = () => {
              reject("Failed to load image");
            };
            img.src = url;
          });
        })
      );
      console.log("Image heights:", imageHeights);

      //merge images based on height
      const imagesForMerge = urls.map((url, index) => ({
        src: url,
        y: imageHeights.slice(0, index).reduce((a, b) => a + b, 0),
      }));
      const mergedImageDataURLB64 = await mergeImages(imagesForMerge, {
        height: imageHeights.reduce((a, b) => a + b, 0),
      });

      setImageB64(mergedImageDataURLB64);
      console.log("mergedImageDataURLB64", mergedImageDataURLB64);
    } catch (error) {
      console.error("error merging images", error);
    } finally {
      //https://stackoverflow.com/questions/6765370/merge-image-using-javascript
      urls.forEach(URL.revokeObjectURL);
    }
  };

  //convert image to file object mergedReceipt.png
  //https://stackoverflow.com/questions/43358456/convert-image-uri-into-javascript-file-object
  const dataURLtoFile = (dataUrl, fileName) => {
    let arr = dataUrl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  useEffect(() => {
    if (pdfFiles.length > 0) {
      pdfFiles.forEach((file) => {
        storeAndConvertReceiptImage(file);
      });
    }
  
    if (uploadedFiles.length > 0 && pdfFiles.length === 0) {
      runMergeImages(uploadedFiles);
    }
  }, [uploadedFiles, pdfFiles]);

  useEffect(() => {
    if (imageB64 !== "") {
      const file = dataURLtoFile(imageB64, "mergedReceipt.png");
      storeAndConvertReceiptImage(file);
      console.log("imageB64", file);
    }
  }, [imageB64]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (transactionNo && currentUser) {
      setReceiptWBgtTransNo({
        ...receiptJsonData,
        transactionNo,
        budgetID,
        uid: currentUser.uid,
      });
    }
  }, [transactionNo, receiptJsonData]);


  useEffect(() => {
    if (fireImageURL) {
      setReceiptWFirebaseURL({ ...receiptWBgtTransNo, fireImageURL });
      console.log("receipt with firebase url", receiptWFirebaseURL);
    }
  }, [fireImageURL, receiptWBgtTransNo]);

  useEffect(() => {
    setReceiptWAllInfo(receiptWFirebaseURL);
    onSetReceipWAllInfo(receiptWAllInfo);
    console.log("receipt with all info", receiptWAllInfo);
  },[receiptWAllInfo,receiptWFirebaseURL]);


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
    console.log("Budget ID", budgetID);

    //Calling OCR Perform Function
    // if (imageURL) {
    //   setReceiptJsonData(await performOcr(imageURL));
    //   onSetJsonData(await performOcr(imageURL));
    // }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "application/pdf": [],
    },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      const imageFiles = acceptedFiles.filter(file => file.type.startsWith("image/"));
      const pdfFiles = acceptedFiles.filter(file => file.type === "application/pdf");
      
      setUploadedFiles(imageFiles);
      setPdfFiles(pdfFiles);
      onSetPDFFiles(pdfFiles);
      console.log("pdfFiles in DragDrop", pdfFiles);
      console.log("acceptedFiles", acceptedFiles);
    },
  });

  return (
    <div className="bg-main-neonPink  my-[16px] mx-[32px] rounded-[16px] py-[16px] flex justify-center items-center text-white font-semibold hover:bg-neon-pink">
      <div {...getRootProps()}>
        <input {...getInputProps()} className="my-[16px]" />
        <p>Drag and drop photos here or click to browse (10 Maximum files)</p>
        {uploadedFiles.map((file) => (
          <span key={file.path}>
            {file.path} {(file.size / 1048576).toFixed(2)} MB <br />
          </span>
        ))}
      </div>
      {/* {!!imageB64 && <img src={imageB64} alt="merged" />} */}
    </div>
  );
};

export default DragDrop;
