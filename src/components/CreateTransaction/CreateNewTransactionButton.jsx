import { Link } from "react-router-dom";

export function CreateNewTransactionButton() {
  return (
    <Link to="/create">
      <button className="text-white mx-auto w-full bg-[#6859C9] mt-4 p-4  rounded-lg text-lg uppercase hover:bg-[#6d5dd1] duration-150">
        Create New Transaction
      </button>
    </Link>
  );
}
