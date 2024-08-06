import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { db } from "../../utils/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

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

  //ask chatgpt how to handle input change clean code
  const handleInputChange = (e, field, index) => {
    const updatedTransactions = { ...results.relatedTransactions };
    if (field.includes("line_items")) {
      const [_, key] = field.split(".");
      updatedTransactions.line_items[index][key] = e.target.value;
    } else {
      updatedTransactions[field] = e.target.value;
    }
    setResults({ ...results, relatedTransactions: updatedTransactions });
  };

  const handleSave = async () => {
    try {
      const transactionId = params.transaction;
      await setDoc(
        doc(db, "transactions", transactionId),
        results.relatedTransactions
      );
      toast.success("Transaction updated successfully!");
    } catch (error) {
      console.error("Error updating transaction: ", error);
      toast.error("Failed to update transaction.");
    }
  };
  console.log(results.relatedTransactions?.line_items);
  return (
    <Layout>
      <div className='mt-[90px] relative'>
        <h1 className='text-main-darkPink text-2xl md:text-4xl lg:text-4xl mt-20 tracking-wider px-4 xl:px-20'>
          Transaction Receipt Detail Information
        </h1>

        <div className='mt-4 px-4 xl:px-20'>
          <div className='flex justify-between items-center'>
            <h1 className='large-h1-span border border-pink-400 hover:border-main-darkPink duration-200 cursor-pointer font-bold p-3 rounded-lg'>
              {results.titleLocal} / {results?.id}
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
                    className='max-h-screen max-w-full object-contain p-4'
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

          <div className='mt-10'>
            <div className='overflow-y-scroll max-h-[650px] border border-gray-300 relative'>
              <table className='min-w-full bg-white border border-gray-300'>
                <thead className='sticky top-0 w-full'>
                  <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th className='py-3 px-2 text-center'>No.</th>
                    <th className='py-3 px-4 text-left'>Item</th>
                    <th className='py-3 px-2 text-left'>Category</th>
                    <th className='py-3 px-2 text-left'>Price($CAD)</th>
                    <th className='py-3 px-2 text-left'>Quantity</th>
                    <th className='py-3 px-2 text-left'>Total($CAD)</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  {results.relatedTransactions?.line_items?.map(
                    (item, index) => (
                      <tr
                        key={index}
                        className='border-b border-gray-200 hover:bg-gray-100'
                      >
                        <td className='py-3 px-2 text-center'>{index + 1}</td>
                        <td className='py-3 px-4 text-left'>
                          <input
                            type='text'
                            value={item.description || ""}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `line_items.description`,
                                index
                              )
                            }
                            className='w-full border border-gray-300 rounded px-2 py-1'
                          />
                        </td>
                        <td className='py-3 px-2 text-left'>
                          <input
                            type='text'
                            value={item.type || ""}
                            onChange={(e) =>
                              handleInputChange(e, `line_items.type`, index)
                            }
                            className='w-full border border-gray-300 rounded px-2 py-1'
                          />
                        </td>
                        <td className='py-3 px-2 text-left'>
                          <input
                            type='text'
                            value={
                              item.price ||
                              (item?.total / item.quantity)?.toFixed(2) ||
                              0
                            }
                            onChange={(e) =>
                              handleInputChange(e, `line_items.price`, index)
                            }
                            className='w-full border border-gray-300 rounded px-2 py-1'
                          />
                        </td>
                        <td className='py-3 px-2 text-left'>
                          <input
                            type='text'
                            value={
                              item.unit_of_measure
                                ? `${item.quantity}/${item.unit_of_measure}`
                                : `${item.quantity}/unit`
                            }
                            onChange={(e) =>
                              handleInputChange(e, `line_items.quantity`, index)
                            }
                            className='w-full border border-gray-300 rounded px-2 py-1'
                          />
                        </td>
                        <td className='py-3 px-2 text-left'>
                          <input
                            type='text'
                            value={item?.total || ""}
                            readOnly
                            className='w-full border border-gray-300 rounded px-2 py-1'
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className='mt-4 w-full'>
            <button
              onClick={handleSave}
              className='text-white w-full p-3 bg-main-neonPink hover:bg-main-darkPink duration-200 rounded-lg'
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
