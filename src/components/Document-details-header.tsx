import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DocumentDetailsHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between pb-10 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          className="p-2 hover:cursor-pointer hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          aria-label="Go back"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-lg font-semibold text-gray-900 truncate max-w-50 sm:max-w-md">
          Documents
        </h1>
      </div>
    </header>
  );
}

export default DocumentDetailsHeader;
