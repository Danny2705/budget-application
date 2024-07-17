import { Link } from "react-router-dom";

export default function CreateNewTransactionButton({budgetIDNo}) {

  console.log("Budget ID in Create NEW TRANS Button:", budgetIDNo);


  return (
    <Link to={`/budget/transaction/create/${budgetIDNo}`}>
      <button className="text-white mx-auto w-full bg-[#6859C9] mt-4 p-4  rounded-lg text-lg uppercase hover:bg-[#6d5dd1] duration-150">
        Create New Transaction
      </button>
    </Link>
  );
}
