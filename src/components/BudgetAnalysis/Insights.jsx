import { FiDownload } from "react-icons/fi";
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
import { transactionData } from "../TransactionTable/Data";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";


styles = StyleSheet.create({
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

export const ReportSection = ({ title, amount, color }) => (
  <div>
    <h2>{title}</h2>
    <h1 style={{ color }}>{amount}</h1>
  </div>
);

export const ProgressBar = ({ value, max, color }) => (
  <div
    style={{
      backgroundColor: "#ddd",
      height: "20px",
      width: "100%",
      marginBottom: "10px",
    }}
  >
    <div
      style={{
        backgroundColor: color,
        width: `${(value / max) * 100}%`,
        height: "100%",
      }}
    ></div>
  </div>
);

export const Report = ({ data }) => (
  <div>
    {data.map((monthData, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "#001f3f",
          padding: "20px",
          margin: "10px 0",
          color: "#fff",
        }}
      >
        <h1>
          {monthData.month} {monthData.year}
        </h1>
        <ReportSection
          title="Total Income"
          amount={`$${monthData.totalIncome}`}
          color="green"
        />
        <ReportSection
          title="Total Expenses"
          amount={`$${monthData.totalExpenses}`}
          color="red"
        />
        <ReportSection
          title="Total Savings"
          amount={`$${monthData.totalSavings}`}
          color="yellow"
        />
        <ProgressBar
          value={monthData.totalSavings}
          max={monthData.totalIncome}
          color="yellow"
        />
      </div>
    ))}
  </div>
);

export const ReportDocument = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Report From Vio Vault</Text>
        <Text style={styles.subTitle}>Monthly Report</Text>
      </View>
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Amount Saved</Text>
          <Text style={styles.summaryValue}>$1456</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Date</Text>
          <Text style={styles.summaryValue}>
            {new Date().toLocaleDateString()}
          </Text>
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
          Viovault simplifies saving by analyzing your spending and
          automatically setting aside money for your goals. Effortlessly build
          your savings with personalized suggestions and automated transfers.
          Achieve financial security with ease using Viovault.
        </Text>
      </View>
    </Page>
  </Document>
);

export const ExportButtons = () => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactionData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "Vio Vault report.xlsx");
  };

  return (
    <div className="mt-6 text-center flex gap-1 justify-center">
      <PDFDownloadLink
        document={<ReportDocument />}
        fileName="Vio Vault report.pdf"
      >
        {({ loading }) => (
          <button className="text-white border border-main-neonPink px-[25px] py-[9px] z-10 hover:bg-gradient-to-br hover:from-pink-600 hover:via-red-500 hover:to-purple-700 text-lg">
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
        className="text-white border border-main-neonPink px-[25px] py-[9px] z-10 hover:bg-gradient-to-br hover:from-pink-600 hover:via-red-500 hover:to-purple-700 text-lg"
      >
        <FiDownload className="mr-2 text-xl" />
        Download CSV
      </CSVLink>
      <button
        onClick={exportToExcel}
        className="text-white border border-main-neonPink px-[25px] py-[9px] z-10 hover:bg-gradient-to-br hover:from-pink-600 hover:via-red-500 hover:to-purple-700 text-lg"
      >
        <FiDownload className="mr-2 text-xl" />
        Download Excel
      </button>
    </div>
  );
};
