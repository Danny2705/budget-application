import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../Chat/FirebaseConfig";

export default function RecentTransaction() {
  const [transactions, setTransactions] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getBudgetWithTransactions = async () => {
      try {
        // Fetch budgets
        const budgetSnapshot = await getDocs(
          collection(db, `users/${user.uid}/budget`)
        );
        const budgets = budgetSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data(); // Use budget ID as the key
          return acc;
        }, {});

        // Fetch transactions filtered by userId
        const transactionsQuery = query(
          collection(db, `transactions`),
          where("uid", "==", user.uid) // Filter by userId
        );
        const transactionsSnapshot = await getDocs(transactionsQuery);
        const allTransactions = transactionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Link transactions to budgets and sort them
        const transactionsWithBudgets = allTransactions
          .map((transaction) => ({
            ...transaction,
            budget: budgets[transaction.budgetID], // Add budget details to the transaction
          }))
          .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
          .slice(0, 5);

        console.log(
          "Recent Transactions with Budgets:",
          transactionsWithBudgets
        );

        setTransactions(transactionsWithBudgets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user) {
      getBudgetWithTransactions();
    }
  }, [user]);

  return (
    <div className='wrapper mx-auto gap-1 py-4 w-full overflow-x-auto md:overflow-x-visible'>
      <div>
        <div className='grid grid-cols-8 gap-2 rounded-t-xl p-4 text-sm font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
          <div className='text-center'>Transaction No.</div>
          <div className='text-center'>Vendor</div>
          <div className='text-center'>Date</div>
          <div className='text-center col-span-2 '>Location</div>
          <div className='text-center'>Subtotal</div> {/* Shorter width */}
          <div className='text-center'>Tax</div> {/* Shorter width */}
          <div className='text-center'>Total</div> {/* Shorter width */}
        </div>
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className={`grid grid-cols-8 gap-2 p-4 ${
              index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
            } text-white hover:bg-gray-600 transition-colors duration-300`}
          >
            <div className='text-center'>
              <button className='truncate-multiline overflow-hidden whitespace-nowrap w-[10rem]'>
                {transaction.transactionNo}
              </button>
            </div>
            <div className='text-center'>{transaction?.vendor.name}</div>
            <div className='text-center'>{transaction.date}</div>
            <div className='truncate-multiline col-span-2 text-center'>
              {transaction?.vendor.address || "N/A"}
            </div>
            <div className='text-center'>{transaction.subtotal || "N/A"}</div>{" "}
            {/* Shorter width */}
            <div className='text-center'>{transaction.tax || 0}</div>{" "}
            {/* Shorter width */}
            <div className='text-center'>{transaction.total}</div>{" "}
            {/* Shorter width */}
          </div>
        ))}
      </div>
    </div>
  );
}
