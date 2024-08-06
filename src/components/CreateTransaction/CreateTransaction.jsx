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
  const [receiptWAllInfo, setReceiptWAllInfo] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const handleOnClickSaveButton = () => {
    console.log("save****", receiptWAllInfo.transactionNo);
    saveReceiptToFirestore(
      receiptWAllInfo.transactionNo,
      receiptWAllInfo,
      imageURL,
      budgetInfo.id
    );
  };

  return (
    <Layout>
      <div className='mt-[90px] px-4 xl:px-20'>
        <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-16 mb-8 tracking-wider text-center lg:text-left'>
          Budget {budgetInfo?.titleLocal}
        </h1>
        <UploadTrans
          onSetReceiptData={setReceiptData}
          onSetImageURL={setImageURL}
          onSetTransactionNo={setReceiptNo}
          onSetReceipWAllInfo={setReceiptWAllInfo}
          budgetID={budgetInfo.id}
          setLoading={setLoading}
        />
        {/* {!!receiptData && <NewTransVenderTable receiptInfo={receiptData} />} */}
        {loading ? (
          <p className='text-white text-xl text-center mt-4'>Loading....</p>
        ) : (
          receiptData && (
            <>
              <NewTransVenderTable
                receiptInfo={receiptWAllInfo}
                setReceiptData={setReceiptWAllInfo}
              />
              <NewTransLineItemsTable
                receiptInfo={receiptWAllInfo}
                setReceiptData={setReceiptWAllInfo}
              />
              <SaveButton onClick={handleOnClickSaveButton} />
            </>
          )
        )}
      </div>
    </Layout>
  );
}
