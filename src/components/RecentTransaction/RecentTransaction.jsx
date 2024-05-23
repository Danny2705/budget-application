import * as React from "react";

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
      icons: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d0a93e23abb322bf45904e76a27b2b6471c7b5435bfd94291f05a59d3230c93f?",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c450d4a6c39078bf48d7d5c93bad8a7432d543a8452f94f7302335c4e12fbc06?",
      ],
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
      icons: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/485bcb88fc17619083393ec9d5e6502be370e1cb7c878badcef428dd39482c8e?",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5dc325834c2c1bdb35c360fcbb360662668282ed0fe1dca2083d7b4cda7b3c7f?",
      ],
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
      icons: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d4f4ffb1f5bcc78cde836d17fb053f7cfadabce16f7b81eb535e5a8187f4b552?",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c450d4a6c39078bf48d7d5c93bad8a7432d543a8452f94f7302335c4e12fbc06?",
      ],
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
      icons: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/046599c4c41ba2ad7e5177545b19793c6872264b361c00c55c3b4337450f865a?",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5dc325834c2c1bdb35c360fcbb360662668282ed0fe1dca2083d7b4cda7b3c7f?",
      ],
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
      icons: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/79ce21b0151094bb7fb12135fe8bdffe434bad802c3b670b195802e398e5c33b?",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c450d4a6c39078bf48d7d5c93bad8a7432d543a8452f94f7302335c4e12fbc06?",
      ],
    },
  ];

  return (
    // chatgpt used to add overflow. Prompt: "How to add overflow to the parent div to make the table scrollable horizontally."
    <div className="wrapper mx-auto gap-1 p-4 max-w-4xl overflow-x-auto md:overflow-x-visible">
      <div className="min-w-[1000px]">
        <div className="grid grid-cols-10 p-4 text-sm font-bold text-black bg-purple-500">
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
              index % 2 === 0 ? "bg-purple-300" : "bg-purple-500"
            }`}
          >
            <button>
              <div className="text-center">{transaction.transactionId}</div>
            </button>
            <button>
              <div className="text-center">{transaction.budgetId}</div>
            </button>
            <div className="text-center">{transaction.budgetName}</div>
            <div className="text-center">{transaction.vendor}</div>
            <div className="text-center">{transaction.date}</div>
            <div className="text-center">{transaction.location}</div>
            <div className="text-center">{transaction.subtotal}</div>
            <div className="text-center">{transaction.tax}</div>
            <div className="text-center">{transaction.total}</div>
            <div className="flex justify-center gap-2">
              {transaction.icons.map((icon, iconIndex) => (
                <button>
                  <img
                    key={iconIndex}
                    loading="lazy"
                    src={icon}
                    className="shrink-0 w-6 aspect-square"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
