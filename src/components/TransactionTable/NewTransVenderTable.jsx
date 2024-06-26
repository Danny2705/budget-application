import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewTransVenderTable({ receiptInfo }) {
  return (
    <div>
      <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-8 mb-8 tracking-wider text-center lg:text-left'>
        Vendor information
      </h1>

      <div className='wrapper mx-auto gap-1 py-4 w-full overflow-x-auto md:overflow-x-visible'>
        <div className=''>
          <div className='grid grid-cols-9 gap-2  rounded-t-xl p-4 text-sm font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
            <div className='text-center'>Vendor</div>
            <div className='text-center'>Date</div>
            <div className='text-center'>Location</div>
            <div className='text-center'>Category</div>
            <div className='text-center'>Subtotal</div>
            <div className='text-center'>Tax</div>
            <div className='text-center'>Tip</div>
            <div className='text-center'>Total</div>
            <div className='text-center'>Action</div>
          </div>

          <div
            className={`grid grid-cols-9 gap-2 p-4 bg-gray-800 text-white rounded-b-xl`}
          >
            <div className='text-center'>{receiptInfo.vendor.name}</div>
            <div className='text-center'>{receiptInfo.date}</div>
            <div className='text-center'>{receiptInfo.vendor.address}</div>
            <div className='text-center'>{receiptInfo.category}</div>
            <div className='text-center'>
              {receiptInfo.subtotal === null ? 0 : receiptInfo.subtotal}
            </div>
            <div className='text-center'>
              {receiptInfo.tax === null ? 0 : receiptInfo.tax}
            </div>
            <div className='text-center'>
              {receiptInfo.tip === null ? 0 : receiptInfo.tip}
            </div>
            <div className='text-center'>{receiptInfo.total}</div>
            <div className='flex justify-center gap-2'>
              <button className='pr-[16px]'>
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
        </div>
      </div>
    </div>
  );
}
