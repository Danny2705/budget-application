const transactionData = [
  {
    TransactionNo: "2465343",
    Vender: "Walgreens",
    Date: "03/28/2023",
    Category: "Grocery",
    Total: "$50.00",
  },
  {
    TransactionNo: "2465344",
    Vender: "Walmart",
    Date: "03/29/2023",
    Category: "Food",
    Total: "$60.00",
  },
  {
    TransactionNo: "2465345",
    Vender: "AB Clean",
    Date: "03/30/2023",
    Category: "Housing",
    Total: "$70.00",
  },
  {
    TransactionNo: "2465346",
    Vender: "Walgreens",
    Date: "03/31/2023",
    Category: "Grocery",
    Total: "$50.00",
  },
  {
    TransactionNo: "2465347",
    Vender: "Walmart",
    Date: "04/01/2023",
    Category: "Food",
    Total: "$60.00",
  },
  {
    TransactionNo: "2465348",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "$30.00",
  },
];

const tableHead = [
  { name: "Transaction No." },
  { name: "Vender" },
  { name: "Date" },
  { name: "Category" },
  { name: "Total(CAD$)" },
  { name: "Action" },
];

export default function TransactionTable() {
  return (
    <table classname="bg-[#26264F], text-white">
      <thead>
        <tr>
          {tableHead.map((val, key) => {
            return (
              <th
                key={key}
                className="border px-4 py-2 bg-[#26264F] text-white"
              >
                {val.name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="text-white">
        {transactionData.map((val, key) => {
          return (
            <tr
              key={key}
              className={key % 2 === 0 ? "bg-[#26264F]" : "bg-[#1D1E42]"}
            >
              <td className="border px-4 py-2">{val.TransactionNo}</td>
              <td className="border px-4 py-2">{val.Vender}</td>
              <td className="border px-4 py-2">{val.Date}</td>
              <td className="border px-4 py-2">{val.Category}</td>
              <td className="border px-4 py-2">{val.Total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
