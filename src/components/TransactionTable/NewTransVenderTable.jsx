import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RecentBudgetTransTable({ receiptInfo }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full'>
        <div className='flex items-center mb-4 w-full justify-between'>
          <h2 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-8 mb-4 tracking-wider text-center lg:text-left'>
            Vendor Information
          </h2>
        </div>
        <div className='w-full'>
          <table className='text-white rounded-lg w-full border-collapse overflow-hidden'>
            <thead>
              <tr className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                <th className='py-2 px-3 text-white rounded-tl-lg'>
                  Transaction No.
                </th>
                <th className='p-4 text-white'>Vendor</th>
                <th className='p-4 text-white'>Date</th>
                <th className='p-4 text-white'>Location</th>
                <th className='p-4 text-white'>Category</th>
                <th className='p-4 text-white'>Subtotal</th>
                <th className='p-4 text-white'>Tax</th>
                <th className='p-4 text-white'>Tip</th>
                <th className='p-4 text-white'>Total(CAD$)</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              <tr className='bg-gray-800'>
                <td className='p-4 text-center break-words'>
                  <span
                    onClick={() => navigate(`/transaction/${receiptInfo?.id}`)}
                    className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center hover:cursor-pointer focus:cursor-text'
                  >
                    {receiptInfo?.id}
                  </span>
                </td>
                <td className='p-4 text-center break-words'>
                  {receiptInfo?.vendor?.name || "N/A"}
                </td>
                <td className='p-4 text-center break-words'>
                  {receiptInfo?.date || "N/A"}
                </td>
                <td className='p-4 text-center  text-ellipsis'>
                  {receiptInfo?.vendor?.address || "N/A"}
                </td>
                <td className='p-4 text-center break-words'>
                  {receiptInfo?.category || "N/A"}
                </td>
                <td className='p-4 text-center break-words'>
                  {receiptInfo?.subtotal || "0"}
                </td>
                <td className='p-4 text-center break-words'>
                  {receiptInfo?.tax || "0"}
                </td>
                <td className='p-4 text-center break-words'>
                  {receiptInfo?.tip || "0"}
                </td>
                <td className='p-4 py-2 break-words text-center'>
                  {receiptInfo?.total || "0"}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                <td colSpan='9' className='rounded-b-lg'></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
