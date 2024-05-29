import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const transactionData = [
  {
    TransactionNo: "2465343",
    Vender: "Walgreens",
    Date: "03/28/2023",
    Category: "Grocery",
    Total: "50.00",
  },
  {
    TransactionNo: "2465344",
    Vender: "Walmart",
    Date: "03/29/2023",
    Category: "Food",
    Total: "60.00",
  },
  {
    TransactionNo: "2465345",
    Vender: "AB Clean",
    Date: "03/30/2023",
    Category: "Housing",
    Total: "70.00",
  },
  {
    TransactionNo: "2465346",
    Vender: "Walgreens",
    Date: "03/31/2023",
    Category: "Grocery",
    Total: "50.00",
  },
  {
    TransactionNo: "2465347",
    Vender: "Walmart",
    Date: "04/01/2023",
    Category: "Food",
    Total: "60.00",
  },
  {
    TransactionNo: "2465348",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465349",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465350",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465351",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465352",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465353",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465354",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465355",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465355",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465355",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465355",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465355",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465355",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
  {
    TransactionNo: "2465355",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "30.00",
  },
];

export default function RecentBudgetTransTable() {
  return (
    <div className='flex justify-center items-center'>
      <div className=' w-full'>
        <div className='w-full'>
          <table className='text-white rounded-lg w-full '>
            <thead>
              <tr className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                {/* control boarder radius of the table head; refer from 
            https://stackoverflow.com/questions/4932181/rounded-table-corners-css-only */}
                <th className='py-2 px-3 text-white'>Transaction No.</th>
                <th className='p-4 text-white'>Vender</th>
                <th className='p-4 text-white'>Date</th>
                <th className='p-4 text-white'>Category</th>
                <th className='p-4 text-white'>Total(CAD$)</th>
                <th className='px-6 py-2 text-white'>Action</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {transactionData.map((val, key) => {
                return (
                  /* switch color of the row refer from https://chatgpt.com/
            bg-[#26264F] and bg-[#1D1E42] are the colors used in the Figma Design
            */
                  <tr
                    key={key}
                    className={key % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
                  >
                    <td className='p-4 text-center break-words'>
                      <button>{val.TransactionNo}</button>
                    </td>
                    <td className='p-4 text-center break-words'>
                      {val.Vender}
                    </td>
                    <td className='p-4 text-center break-words'>{val.Date}</td>
                    <td className='p-4 text-center break-words'>
                      {val.Category}
                    </td>
                    <td className='p-4 py-2 break-words text-center'>
                      {val.Total}
                    </td>
                    <td className='p-4'>
                      <div className='flex flex-row justify-center'>
                        <button className='pr-[32px]'>
                          {/* #624DE3 is the color in the Figna Design */}
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "#624DE3" }}
                          />
                        </button>
                        <button>
                          {/* #A30D11 is the color in the Figna Design */}
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{ color: "#A30D11" }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to='/create'>
            <button className='text-white mx-auto w-full bg-[#6859C9] mt-4 p-4  rounded-lg text-lg uppercase hover:bg-[#6d5dd1] duration-150'>
              Create New Transaction
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
