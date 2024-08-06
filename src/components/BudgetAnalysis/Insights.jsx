import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiDownload } from "react-icons/fi";
import { transactionData } from "../TransactionTable/Data";
import useExpenseData from "../Chart/BarData";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { format } from "date-fns";

export default function ExportButtons() {
  const user = useSelector((state) => state.auth.user);
  const { labelState, totalMoneySpent, totalBudgetLimit } = useExpenseData();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const date = format(new Date(), "yyyy-MM-dd")

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: 'Helvetica',
      color: '#333',
    },
    header: {
      textAlign: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 50,
      height: 50,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 12,
      marginBottom: 5,
      color: 'gray',
    },
    summary: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    summaryItem: {
      flex: 1,
      padding: 10,
      margin: 5,
      border: '1px solid #ccc',
      borderRadius: 5,
      textAlign: 'center',
    },
    summaryTitle: {
      fontSize: 10,
      marginBottom: 5,
      fontWeight: 'bold',
      color: 'gray',
    },
    summaryValue: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    receiptList: {
      marginTop: 20,
      borderTop: '1px solid #ccc',
      paddingTop: 10,
    },
    receiptItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    footer: {
      marginTop: 20,
      borderTop: '1px solid #ccc',
      paddingTop: 10,
      fontSize: 10,
      color: 'gray',
      textAlign: 'center',
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
          {transactionData.map((receipt, index) => (
            <View key={index} style={styles.receiptItem}>
              <Text>{receipt.TransactionNo}</Text>
              <Text>{receipt.Vender}</Text>
              <Text>{receipt.Date}</Text>
              <Text>{receipt.Category}</Text>
              <Text>{receipt.Total}</Text>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Text>
          Viovault simplifies saving by analyzing your spending and automatically setting aside money for your goals. Effortlessly build your savings with personalized suggestions and automated transfers. Achieve financial security with ease using Viovault.
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

  const month = labelState[currentMonthIndex];
  const spent = totalMoneySpent[month] || 0;
  const budgetLimit = totalBudgetLimit[month] || 0;
  const savings = budgetLimit - spent;

  return (
    <div className="w-full max-w-md bg-transparent border-pink-900 border-2 rounded-lg shadow-lg text-white p-5 mx-10">
      <div className="text-3xl font-bold text-center mb-4">Insights</div>
      <div className="text-2xl mb-6 text-main-darkPink">Hello, {user.displayName}!</div>
      <div className="relative">
        <div className="overflow-hidden">
          <div className="transition-transform transform">
            {labelState.map((month) => {
              const spent = totalMoneySpent[month] || 0;
              const budgetLimit = totalBudgetLimit[month] || 0;
              const savings = budgetLimit - spent;
              // setTotalSavings(savings += savings);
              return (
                <div key={month} className="w-full min-w-full p-4 bg-main-darkPurple shadow-md mb-4">
                  {savings >= 0 ? (
                    <div>
                      <p className="text-lg">In {month}, you saved <span className="font-bold">${savings}</span>. Great job!</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg">In {month}, you overspent by <span className="font-bold">${-savings}</span>.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between mt-4">
        </div>
      </div>
      <div className="mt-6 text-center flex gap-1">
        <PDFDownloadLink document={<ReportDocument />} fileName="Vio Vault report.pdf">
          {({ loading }) => (
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow inline-flex items-center">
              <FiDownload className="mr-2 text-xl" />
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
          filename="Vio Vault report.csv"
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow inline-flex items-center"
        >
          <FiDownload className="mr-2 text-xl" />
          Download CSV
        </CSVLink>
        <div>
          <button
            onClick={exportToExcel}
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow inline-flex items-center"
          >
            <FiDownload className="mr-2 text-xl" />
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
}
