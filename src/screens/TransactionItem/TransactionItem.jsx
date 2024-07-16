import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

export default function TransactionItem() {
  const [results, setResults] = useState([]);
  const [clicked, setClicked] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const params = useParams();

  useEffect(() => {
    const getBudgetWithTransactions = async () => {
      try {
        const docRef = await getDocs(
          collection(db, `users/${user.uid}/budget`)
        );
        const budgets = docRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(budgets);
        const budgetsWithTransactions = await Promise.all(
          budgets.map(async (budget) => {
            const transactionsSnapshot = await getDocs(
              collection(db, "transactions")
            );
            const transactions = transactionsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            const relatedTransactions = transactions.find(
              (tran) => tran.id === Number(params.transaction)
            );

            const combine = { ...budget, relatedTransactions };
            console.log(combine);
            setResults(combine);
          })
        );
        return budgetsWithTransactions;
      } catch (error) {
        console.error("Error joining collections:", error);
        throw error;
      }
    };
    getBudgetWithTransactions();
  }, [params, user]);
  return (
    <Layout>
      <div className='mt-[90px] relative'>
        <h1 className='text-main-darkPink text-2xl md:text-4xl lg:text-4xl mt-20 tracking-wider px-4 xl:px-20'>
          Transaction Receipt Detail Information
        </h1>

        <div className='mt-4 px-4 xl:px-20'>
          <div className='flex justify-between items-center'>
            <h1 className='large-h1-span border border-pink-400 hover:border-main-darkPink duration-200 cursor-pointer font-bold p-3 rounded-lg'>
              {results.title} / {results.relatedTransactions?.id}
            </h1>

            <div>
              <button
                onClick={() => setClicked(!clicked)}
                className='text-white p-3 bg-main-neonPink hover:bg-main-darkPink duration-200 rounded-lg'
              >
                Click here to see the receipt
              </button>
              {clicked && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900'>
                  <img
                    src={results.relatedTransactions?.imageURLs}
                    alt='Receipt Scanning'
                    width={300}
                  />
                  <button
                    className='absolute right-4 top-10 bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-pink-600 transition duration-300'
                    onClick={() => setClicked(!clicked)}
                  >
                    <IoMdClose />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
