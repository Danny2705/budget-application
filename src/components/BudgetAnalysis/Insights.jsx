import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiDownload } from "react-icons/fi";
import useExpenseData from "../Chart/BarData";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { format } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Chat/FirebaseConfig";

const ExportButtons = () => {
  const user = useSelector((state) => state.auth.user);
  const { labelState, totalMoneySpent, totalBudgetLimit } = useExpenseData();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const date = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    const getBudgetWithTransactions = async () => {
      try {
        const transactionsQuery = query(
          collection(db, `transactions`),
          where("uid", "==", user.uid)
        );
        const transactionsSnapshot = await getDocs(transactionsQuery);
        const allTransactions = transactionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("User Transactions:", allTransactions);

        setTransactionData(allTransactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user) {
      getBudgetWithTransactions();
    }
  }, [user]);

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: "Helvetica",
      color: "#333",
    },
    header: {
      textAlign: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 12,
      marginBottom: 5,
      color: "gray",
    },
    summary: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    summaryItem: {
      flex: 1,
      padding: 10,
      margin: 5,
      border: "1px solid #ccc",
      borderRadius: 5,
      textAlign: "center",
    },
    summaryTitle: {
      fontSize: 10,
      marginBottom: 5,
      fontWeight: "bold",
      color: "gray",
    },
    summaryValue: {
      fontSize: 12,
      fontWeight: "bold",
    },
    receiptList: {
      marginTop: 20,
      borderTop: "1px solid #ccc",
      paddingTop: 10,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f7f7f7",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 5,
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    tableHeaderCell: {
      fontSize: 10,
      fontWeight: "bold",
      color: "gray",
      flex: 1,
      textAlign: "center",
    },
    tableCell: {
      fontSize: 10,
      flex: 1,
      textAlign: "center",
    },
    footer: {
      marginTop: 20,
      borderTop: "1px solid #ccc",
      paddingTop: 10,
      fontSize: 10,
      color: "gray",
      textAlign: "center",
    },
  });

  const ReportDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Report From Vio Vault</Text>
          <Text style={styles.subTitle}>Report {labelState[0]}</Text>
        </View>
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryTitle}>Amount Saved</Text>
            <Text style={styles.summaryValue}>$1456</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryTitle}>Date</Text>
            <Text style={styles.summaryValue}>{date}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryTitle}>Type</Text>
            <Text style={styles.summaryValue}>PDF</Text>
          </View>
        </View>
        <View style={styles.receiptList}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Transaction No.</Text>
              <Text style={styles.tableHeaderCell}>Vendor</Text>
              <Text style={styles.tableHeaderCell}>Date</Text>
              <Text style={styles.tableHeaderCell}>Category</Text>
              <Text style={styles.tableHeaderCell}>Total</Text>
            </View>
            {transactionData.map((receipt, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{receipt?.id}</Text>
                <Text style={styles.tableCell}>
                  {receipt?.vendor?.name || "N/A"}
                </Text>
                <Text style={styles.tableCell}>{receipt?.date}</Text>
                <Text style={styles.tableCell}>
                  {receipt?.category || "N/A"}
                </Text>
                <Text style={styles.tableCell}>${receipt?.total || "N/A"}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <Text>
            Viovault simplifies saving by analyzing your spending and
            automatically setting aside money for your goals. Effortlessly build
            your savings with personalized suggestions and automated transfers.
            Achieve financial security with ease using Viovault.
          </Text>
        </View>
      </Page>
    </Document>
  );

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactionData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "Vio Vault report.xlsx");
  };

  return (
    <div className='mt-6 text-center justify-center flex gap-1'>
      <PDFDownloadLink
        document={<ReportDocument />}
        fileName='Vio Vault report.pdf'
      >
        {({ loading }) => (
          <button className='text-white border border-main-neonPink px-[25px] py-[9px] z-10 hover:bg-gradient-to-br hover:from-pink-600 hover:via-red-500 hover:to-purple-700 text-lg'>
            <FiDownload className='mr-2 text-xl' />
            {loading ? "Generating PDF..." : "Download PDF report"}
          </button>
        )}
      </PDFDownloadLink>
      <CSVLink
        data={transactionData}
        headers={[
          { label: "Transaction No", key: "TransactionNo" },
          { label: "Vender", key: "Vender" },
          { label: "Date", key: "Date" },
          { label: "Category", key: "Category" },
          { label: "Total", key: "Total" },
        ]}
        filename='Vio Vault report.csv'
        className='text-white border border-main-neonPink px-[25px] py-[9px] z-10 hover:bg-gradient-to-br hover:from-pink-600 hover:via-red-500 hover:to-purple-700 text-lge'
      >
        <FiDownload className='mr-2 text-xl' />
        Download CSV
      </CSVLink>
      <div>
        <button
          onClick={exportToExcel}
          className='text-white border border-main-neonPink px-[25px] py-[9px] z-10 hover:bg-gradient-to-br hover:from-pink-600 hover:via-red-500 hover:to-purple-700 text-lg'
        >
          <FiDownload className='mr-2 text-xl' />
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default ExportButtons;
