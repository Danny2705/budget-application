import React, { useEffect } from "react";
import Layout from "../../screens/Layout/Layout";
import UploadTrans from "../UploadTrans/UploadTrans";
import NewTransVenderTable from "../TransactionTable/NewTransVenderTable";
import NewTransLineItemsTable from "../TransactionTable/NewTransLineItemsTable";
import { useState } from "react";
import SaveButton from "../UploadTrans/SaveButton";
import { saveReceiptToFirestore } from "../../utils/firebase";

export default function CreateTransaction() {
  const [receiptData, setReceiptData] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [receiptNo, setReceiptNo] = useState("");

  console.log("receiptData in create transaction page", receiptData);

  const handleOnClickSaveButton = () => {
    saveReceiptToFirestore(
      receiptNo,
      receiptData,
      imageURL
      //userEmail,
    );
  };

  return (
    <Layout>
      <div className="mt-[90px] px-4 xl:px-20">
        <h1 className="text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-16 mb-8 tracking-wider text-center lg:text-left">
          Budget Name1
        </h1>
        <UploadTrans onSetReceiptData={setReceiptData} onSetImageURL={setImageURL} onSetTransactionNo={setReceiptNo}/>
        <h1 className="text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-8 mb-8 tracking-wider text-center lg:text-left">
          Create New Transaction
        </h1>
        {/* <NewTransVenderTable receiptInfo={receiptData} />
        <NewTransLineItemsTable receiptInfo={receiptData}/> */}
        <SaveButton onClick={handleOnClickSaveButton} />
      </div>
    </Layout>
  );
}
