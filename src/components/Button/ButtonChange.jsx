import { useNavigate } from "react-router-dom";

function ButtonChange() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="whitespace-nowrap text-sm font-medium transition-colors bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-600 hover:text-white h-9 w-full sd:w-1/5 max-w-[300px] rounded-xl p-6 flex items-center justify-center text-white"
    >
      <span className="text-sm font-bold">Ubah Pencarian</span>
    </button>
  );
}

export default ButtonChange;
