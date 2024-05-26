import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

// code referenced from figma and edited by Emon//

export default function RecentTransaction() {
  const transactions = [
    {
      transactionId: "2465343",
      budgetId: "123456",
      budgetName: "Grocery",
      vendor: "Walgreens",
      date: "03/28/2023",
      location: "Calgary, AB",
      subtotal: "$27.60",
      tax: "$1.38",
      total: "$28.98",
    },
    {
      transactionId: "2465343",
      budgetId: "123456",
      budgetName: "Grocery",
      vendor: "Walmart",
      date: "03/28/2023",
      location: "Calgary, AB",
      subtotal: "$45.00",
      tax: "$2.25",
      total: "$47.25",
    },
    {
      transactionId: "2465343",
      budgetId: "123456",
      budgetName: "Grocery",
      vendor: "AB Clean",
      date: "03/27/2023",
      location: "Calgary, AB",
      subtotal: "$45.00",
      tax: "$2.25",
      total: "$47.25",
    },
    {
      transactionId: "2465343",
      budgetId: "123456",
      budgetName: "Grocery",
      vendor: "GG Cafe",
      date: "03/27/2023",
      location: "Calgary, AB",
      subtotal: "$27.60",
      tax: "$1.38",
      total: "$28.98",
    },
    {
      transactionId: "2465343",
      budgetId: "123456",
      budgetName: "Grocery",
      vendor: "CC Car",
      date: "03/27/2023",
      location: "Calgary, AB",
      subtotal: "$27.60",
      tax: "$1.38",
      total: "$28.98",
    },
  ];

  return (
    // chatgpt used to add overflow. Prompt: "How to add overflow to the parent div to make the table scrollable horizontally."
    <div className="wrapper mx-auto gap-1 p-4 w-full overflow-x-auto md:overflow-x-visible">
      <div className="">
        <div className="grid grid-cols-10 gap-2 p-4 text-sm font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          <div className="text-center">Transaction No.</div>
          <div className="text-center">Budget No.</div>
          <div className="text-center">Budget Name</div>
          <div className="text-center">Vendor</div>
          <div className="text-center">Date</div>
          <div className="text-center">Location</div>
          <div className="text-center">Subtotal</div>
          <div className="text-center">Tax</div>
          <div className="text-center">Total</div>
          <div className="text-center">Action</div>
        </div>
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className={`grid grid-cols-10 gap-2 p-4 ${
              index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
            } text-white`}
          >
            <div className="text-center">
              <button>{transaction.transactionId}</button>
            </div>
            <div className="text-center">
              <button>{transaction.budgetId}</button>
            </div>
            <div className="text-center">{transaction.budgetName}</div>
            <div className="text-center">{transaction.vendor}</div>
            <div className="text-center">{transaction.date}</div>
            <div className="text-center">{transaction.location}</div>
            <div className="text-center">{transaction.subtotal}</div>
            <div className="text-center">{transaction.tax}</div>
            <div className="text-center">{transaction.total}</div>
            <div className="flex justify-center gap-2">
              <button className="pr-[16px]">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: "#9E5EED" }}
                />
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ color: "#DD5250" }}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
