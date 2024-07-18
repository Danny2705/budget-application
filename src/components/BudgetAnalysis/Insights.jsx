import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiDownload } from "react-icons/fi";
import { transactionData } from "../TransactionTable/Data";
import useExpenseData from "../Chart/BarData";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

export default function Insights() {
  const user = useSelector((state) => state.auth.user);
  const { labelState, totalMoneySpent, totalBudgetLimit } = useExpenseData();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const handleNext = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % labelState.length);
  };

  const handlePrevious = () => {
    setCurrentMonthIndex((prevIndex) =>
      prevIndex === 0 ? labelState.length - 1 : prevIndex - 1
    );
  };

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
    logo: {
      width: 50,
      height: 50,
      marginBottom: 10,
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
    receiptItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
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
          <Text style={styles.title}>Receipt from Acme Inc.</Text>
          <Text style={styles.subTitle}>Receipt #1</Text>
        </View>
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryTitle}>Amount Paid</Text>
            <Text style={styles.summaryValue}>$100</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryTitle}>Date</Text>
            <Text style={styles.summaryValue}>12/31/2020, 4:00:00 PM</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryTitle}>Payment Method</Text>
            <Text style={styles.summaryValue}>0911</Text>
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
            This is some additional content to inform you that Acme Inc. is a
            fake company and this is a fake receipt. This is just a demo to show
            you how you can create a beautiful receipt with react-pdf.
          </Text>
        </View>
      </Page>
    </Document>
  );

  const month = labelState[currentMonthIndex];
  const spent = totalMoneySpent[month] || 0;
  const budgetLimit = totalBudgetLimit[month] || 0;
  const savings = budgetLimit - spent;

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 p-6 rounded-lg shadow-lg text-white">
      <div className="text-3xl font-bold text-center mb-4">Insights</div>
      <div className="text-xl mb-6">Hello, {user.displayName}!</div>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="transition-transform transform"
            style={{ transform: `translateX(-${currentMonthIndex * 100}%)` }}
          >
            {labelState.map((month, index) => {
              const spent = totalMoneySpent[month] || 0;
              const budgetLimit = totalBudgetLimit[month] || 0;
              const savings = budgetLimit - spent;
              return (
                <div
                  key={month}
                  className="w-full min-w-full p-4 bg-purple-800 rounded-lg shadow-md mb-4"
                >
                  {savings >= 0 ? (
                    <div>
                      <p className="text-lg">
                        In {month}, you saved{" "}
                        <span className="font-bold">${savings}</span>. Great
                        job!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg">
                        In {month}, you overspent by{" "}
                        <span className="font-bold">${-savings}</span>.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevious}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow"
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-6 text-center">
        <PDFDownloadLink
          document={<ReportDocument />}
          fileName="VioVault Report.pdf"
        >
          {({ loading }) => (
            <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow inline-flex items-center">
              <FiDownload className="mr-2 text-xl" />
              {loading ? "Generating PDF..." : "Download report analysis"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
