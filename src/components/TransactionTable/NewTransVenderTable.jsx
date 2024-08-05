import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RecentBudgetTransTable({
  receiptInfo,
  setReceiptData,
}) {
  const navigate = useNavigate();

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setReceiptData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

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
                  <input
                    type='text'
                    value={receiptInfo?.vendor?.name || ""}
                    onChange={(e) => handleInputChange(e, "vendorName")}
                    className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                  />
                </td>
                <td className='p-4 text-center break-words'>
                  <input
                    type='text'
                    value={receiptInfo?.date || ""}
                    onChange={(e) => handleInputChange(e, "date")}
                    className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                  />
                </td>
                <td className='p-4 text-center text-ellipsis'>
                  <input
                    type='text'
                    value={receiptInfo?.vendor?.address || "N/A"}
                    onChange={(e) => handleInputChange(e, "vendorAddress")}
                    className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                  />
                </td>
                <td className='p-4 text-center break-words'>
                  <input
                    type='text'
                    value={receiptInfo?.category || ""}
                    onChange={(e) => handleInputChange(e, "category")}
                    className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                  />
                </td>
                <td className='p-4 text-center break-words'>
                  <input
                    type='text'
                    value={receiptInfo?.subtotal || 0}
                    onChange={(e) => handleInputChange(e, "subtotal")}
                    className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                  />
                </td>
                <td className='p-4 text-center break-words'>
                  <input
                    type='text'
                    value={receiptInfo?.tax || 0}
                    onChange={(e) => handleInputChange(e, "tax")}
                    className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                  />
                </td>
                <td className='p-4 text-center break-words'>
                  <input
                    type='text'
                    value={receiptInfo?.tip || 0}
                    onChange={(e) => handleInputChange(e, "tip")}
                    className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                  />
                </td>
                <td className='p-4 py-2 break-words text-center'>
                  <input
                    type='text'
                    value={receiptInfo?.total || 0}
                    onChange={(e) => handleInputChange(e, "total")}
                    className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
