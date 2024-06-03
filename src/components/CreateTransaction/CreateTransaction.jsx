import React from "react";
import Layout from "../../screens/Layout/Layout";
import UploadTrans from "../UploadTrans/UploadTrans";
import NewTransVenderTable from "../TransactionTable/NewTransVenderTable";
import NewTransLineItemsTable from "../TransactionTable/NewTransLineItemsTable";

export default function CreateTransaction() {
  return (
    <Layout>
      <div className='mt-[90px] px-4 xl:px-20'>
        <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-16 mb-8 tracking-wider text-center lg:text-left'>
          Budget Name1
        </h1>
        <UploadTrans />
        <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-8 mb-8 tracking-wider text-center lg:text-left'>
          Create New Transaction
        </h1>
        <NewTransVenderTable />
        <NewTransLineItemsTable />
        <div className='text-white'>OCR Feature</div>
      </div>
    </Layout>
  );
}
