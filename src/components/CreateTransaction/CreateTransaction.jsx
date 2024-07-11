import React, { useState } from "react";
import Layout from "../../screens/Layout/Layout";
import UploadTrans from "../UploadTrans/UploadTrans";
import NewTransVenderTable from "../TransactionTable/NewTransVenderTable";
import NewTransLineItemsTable from "../TransactionTable/NewTransLineItemsTable";
import SaveButton from "../UploadTrans/SaveButton";
import { saveReceiptToFirestore } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateTransaction() {
  const { id } = useParams();
  const budgets = useSelector((state) => state.budgets.budgets);
  const budgetInfo = budgets.find((budget) => budget.id === id);

  // Log budgets and budgetInfo for debugging
  console.log("Budgets:", budgets);
  console.log("Budget Info:", budgetInfo);

  // const budgetNo = useSelector((state) => state.budgets.budgetNo);
  // const budgetTitle = useSelector((state) => state.budgets.budgetTitle);

  const [receiptData, setReceiptData] = useState();
  const [imageURL, setImageURL] = useState(null);
  const [receiptNo, setReceiptNo] = useState("");

  const handleOnClickSaveButton = () => {
    console.log("save****", receiptNo);
    saveReceiptToFirestore(
      receiptNo,
      receiptData,
      imageURL
      //userEmail,
    );
  };


  return (
    <Layout>
      <div className='mt-[90px] px-4 xl:px-20'>
        <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-16 mb-8 tracking-wider text-center lg:text-left'>
          Budget{budgetInfo?.title}
        </h1>
        <UploadTrans onSetReceiptData={setReceiptData} onSetImageURL={setImageURL} onSetTransactionNo={setReceiptNo}/>
        {!!receiptData && <NewTransVenderTable receiptInfo={receiptData} />}
        {!!receiptData && <NewTransLineItemsTable receiptInfo={receiptData}/>}
        <SaveButton onClick={handleOnClickSaveButton} />
      </div>
    </Layout>
  );
}
