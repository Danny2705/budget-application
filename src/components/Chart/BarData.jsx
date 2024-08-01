import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { transactionData } from "../TransactionTable/Data.jsx";

export default function useExpenseData() {
  const [allLabels, setAllLabels] = useState([]);
  const [labelState, setLabelState] = useState([]);
  const [totalMoneySpent, setTotalMoneySpent] = useState({});
  const [totalBudgetLimit, setTotalBudgetLimit] = useState({});
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMonthFromTimeStamp = (seconds) => {
      const date = new Date(seconds * 1000);
      return format(date, "MMMM yyyy");
    };

    const formatTransactionData = (data) => {
      return data.map((obj) => ({
        Date: format(obj.Date, "MMMM yyyy"),
        Total: parseFloat(obj.Total),
      }));
    };

    const FetchBudgetData = async () => {
      const docRef = await getDocs(collection(db, `users/${user.uid}/budget`));
      const budgetData = docRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const monthAmounts = budgetData.map((data) => ({
        Date: getMonthFromTimeStamp(data.endDate.seconds),
        Total: parseFloat(data.amount),
      }));
      return monthAmounts;
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
      const transactionDataFormatted = formatTransactionData(transactionData);
      const totalMoneySpentResult = calculateMonthlyMoney(transactionDataFormatted);
      setTotalMoneySpent(totalMoneySpentResult);

      const budgetData = await FetchBudgetData();
      const totalBudgetLimitResult = calculateMonthlyMoney(budgetData);
      setTotalBudgetLimit(totalBudgetLimitResult);

      const allMonths = Array.from(new Set([
        ...transactionDataFormatted.map(item => item.Date),
        ...budgetData.map(item => item.Date)
      ])).sort((a, b) => parse(a, "MMMM yyyy", new Date()) - parse(b, "MMMM yyyy", new Date()));

      setAllLabels(allMonths);
      const latestFiveMonths = allMonths.slice(-5);
      setLabelState(latestFiveMonths);
    };
    
    fetchAndCalculate();
  }, [user, dispatch]);

  return { labelState, totalMoneySpent, totalBudgetLimit, allLabels, setLabelState };
}
