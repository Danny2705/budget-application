import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function RecentBudgetTransTable() {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user) {
        try {
          const transactionsSnapshot = await getDocs(
            collection(db, "budgets", params.id, "receipts")
          );
          const transactions = transactionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(transactions);
          setData(transactions);
        } catch (error) {
          console.error("Error fetching user transactions:", error);
        }
      }
    };

    fetchTransactions();
  }, [user]);

  const handleInputChange = (e, index, field) => {
    const newData = [...data];
    newData[index][field] = e.target.value;
    setData(newData);
  };
  const handleSave = async () => {
    try {
      for (const transaction of data) {
        const transactionId = String(transaction.transactionNo); // Ensure ID is a string

        const transactionDocRef = doc(
          db,
          "budgets",
          params.id,
          "receipts",
          transactionId
        );

        // Log the transaction data before saving
        console.log(`Saving transaction: ${transactionId}`, transaction);

        await setDoc(
          transactionDocRef,
          {
            vendor: transaction.vendor || "",
            date: transaction.date || "",
            category: transaction.category || "",
            total: transaction.total || "",
          },
          { merge: true }
        ); // Use merge to update fields without overwriting
      }
      toast.success("Transactions saved successfully!");
    } catch (error) {
      console.error("Error saving transactions: ", error);
      toast.error("Failed to save transactions.");
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full'>
        <div className='flex items-center mb-4 w-full justify-between'>
          <h2 className='text-lg text-main-neonPink neon-text-shadow'>
            Recent Transactions
          </h2>
          <div>
            <button
              onClick={handleSave}
              className='text-white p-3 bg-main-neonPink hover:bg-main-darkPink duration-200 rounded-lg'
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className='w-full'>
          <table className='text-white rounded-lg w-full border-collapse overflow-hidden'>
            <thead>
              <tr className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                <th className='py-2 px-3 text-white rounded-tl-lg'>
                  Transaction No.
                </th>
                <th className='p-4 text-white'>Vendor</th>
                <th className='p-4 text-white'>Date</th>
                <th className='p-4 text-white'>Category</th>
                <th className='p-4 text-white'>Total(CAD$)</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {data.map((val, key) => (
                <tr
                  key={key}
                  className={key % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
                >
                  <td className='p-4 text-center break-words'>
                    <span
                      onClick={() => navigate(`/transaction/${val.id}`)}
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center hover:cursor-pointer focus:cursor-text'
                    >
                      {val.id}
                    </span>
                  </td>
                  <td className='p-4 text-center break-words'>
                    <input
                      type='text'
                      value={val.vendor?.name || ""}
                      onChange={(e) => handleInputChange(e, key, "vendor.name")}
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center hover:cursor-pointer focus:cursor-text'
                    />
                  </td>
                  <td className='p-4 text-center break-words'>
                    <input
                      type='text'
                      value={val.date}
                      onChange={(e) => handleInputChange(e, key, "date")}
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center hover:cursor-pointer focus:cursor-text'
                    />
                  </td>
                  <td className='p-4 text-center break-words'>
                    <input
                      type='text'
                      value={val.category}
                      onChange={(e) => handleInputChange(e, key, "category")}
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center hover:cursor-pointer focus:cursor-text'
                    />
                  </td>
                  <td className='p-4 py-2 break-words text-center'>
                    <input
                      type='text'
                      value={val.total}
                      onChange={(e) => handleInputChange(e, key, "total")}
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center hover:cursor-pointer focus:cursor-text'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                <td colSpan='6' className='rounded-b-lg'></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
