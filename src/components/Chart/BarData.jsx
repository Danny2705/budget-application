import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function useExpenseData() {
  const [allLabels, setAllLabels] = useState([]);
  const [labelState, setLabelState] = useState([]);
  const [totalMoneySpent, setTotalMoneySpent] = useState({});
  const [totalBudgetLimit, setTotalBudgetLimit] = useState({});
  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  // const budgets = useSelector((state) => state.budgets.budgets);
  // const budgetInfo = budgets.find((budget) => budget.id === params);

  useEffect(() => {
    const getMonthFromTimeStamp = (seconds) => {
      try {
        const date = new Date(seconds * 1000);
        return format(date, "MMMM yyyy");
      } catch (error) {
        console.error("Error formatting timestamp:", error);
        return "Invalid Date";
      }
    };

    const getMonthFromDateString = (dateString) => {
      try {
        const date = new Date(dateString);
        return format(date, "MMMM yyyy");
      } catch (error) {
        console.error("Error formatting date string:", error);
        return "Invalid Date";
      }
    };

    const fetchBudgetData = async () => {
      if (!user) return [];

      try {
        const docRef = await getDocs(
          collection(db, `users/${user.uid}/budget`)
        );
        const budgetData = docRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const monthAmounts = budgetData.map((data) => ({
          Date: getMonthFromTimeStamp(data.endDate.seconds),
          Total: parseFloat(data.amount) || 0,
        }));
        return monthAmounts;
      } catch (error) {
        console.error("Error fetching budget data:", error);
        return [];
      }
    };

    const fetchTransactionData = async () => {
      try {

        const transactionsQuery = query(
          collection(db, `transactions`),
          where("uid", "==", user.uid)
        );
        const transactionsSnapshot = await getDocs(transactionsQuery);
        const transactionData = transactionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

    
        const budgetsSnapshot = await getDocs(
          collection(db, `users/${user.uid}/budget`)
        );
        const budgetData = budgetsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        // Map transactions to formatted data
        const formattedData = transactionData.map((transaction) => {
          const budget = budgetData.find((b) => b.id === transaction.budgetID);
          const endDate = budget ? budget.endDate : "No End Date";
    
          return {
            Date: getMonthFromTimeStamp(endDate.seconds),
            Total: parseFloat(transaction.total) || 0,
          };
        });
    
        console.log(formattedData);
        return formattedData;
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        return [];
      }
    };
     

    const calculateMonthlyMoney = (data) => {
      const monthlyTotals = {};
      data.forEach((transaction) => {
        const month = transaction.Date;
        if (!monthlyTotals[month]) {
          monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += transaction.Total;
      });
      return monthlyTotals;
    };

    const fetchAndCalculate = async () => {
      if (user) {
        try {
          const transactionData = await fetchTransactionData();
          const totalMoneySpentResult = calculateMonthlyMoney(transactionData);
          setTotalMoneySpent(totalMoneySpentResult);

          const budgetData = await fetchBudgetData();
          const totalBudgetLimitResult = calculateMonthlyMoney(budgetData);
          setTotalBudgetLimit(totalBudgetLimitResult);

          const allMonths = Array.from(
            new Set([
              ...transactionData.map((item) => item.Date),
              ...budgetData.map((item) => item.Date),
            ])
          )
            .filter((date) => date !== "Invalid Date")
            .sort(
              (a, b) =>
                parse(a, "MMMM yyyy", new Date()) -
                parse(b, "MMMM yyyy", new Date())
            );

          setAllLabels(allMonths);
          const latestFiveMonths = allMonths.slice(-5);
          setLabelState(latestFiveMonths);
        } catch (error) {
          console.error("Error in fetchAndCalculate:", error);
        }
      }
    };

    fetchAndCalculate();
  }, [user, params.id]);

  return {
    labelState,
    totalMoneySpent,
    totalBudgetLimit,
    allLabels,
    setLabelState,
  };
}
