import { useDispatch, useSelector } from "react-redux";
import { Download } from "@mui/icons-material";
import { FiDownload } from "react-icons/fi";

export default function Insights() {
  const user = useSelector((state) => state.auth.user);
  const handleDowloadReportAnalysis = (event) => {
    event.preventDefault();
    console.log("i am a boy")
  }

  return (
    <div className="flex w-1/3 min-h-20 max-h-40 bg-[#31164c] align-middle gap-1 flex-col p-4 m-4 rounded-lg border border-main-neonPink">
      <div className="text-white text-2xl text-bold">Insights</div>
      <div className="bg-white m-3">Hello {user.displayName}</div>
      <div className="flex justify-center gap-1">
        <div className="text-white font-bold">
            Download report analysis
        </div>
        <FiDownload className="text-cyan-400 hover:text-cyan-800 text-2xl" onClick={handleDowloadReportAnalysis} />
      </div>
    </div>
  );
}
