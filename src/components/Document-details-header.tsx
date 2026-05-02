import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Document } from "../models/document";
import { DocumentStatus } from "../enums/document-status";

function DocumentDetailsHeader({ doc }: { doc: Document }) {
  const navigate = useNavigate();

  const redirectToOriginalFile = () => {
    const newWindow = window.open(doc.path, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.focus();
  };

  return (
    <header className="flex flex-col justify-between pb-10 sticky top-0 z-10">
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

      {doc && (
        <div className="pt-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="shrink-0 flex items-center justify-center w-17 h-17 rounded-lg bg-gray-200">
                <FileText size={30} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {doc.name}{" "}
                    {doc.documentNumber ? `(${doc.documentNumber})` : ""}
                  </h1>

                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 ${
                      doc.status === DocumentStatus.REJECTED
                        ? "bg-red-100 text-red-700"
                        : doc.status === DocumentStatus.NEEDS_REVIEW
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-1 mt-1  text-gray-500">
                  {doc.supplier && (
                    <>
                      <span className="font-medium text-gray-600">
                        {doc.supplier}
                      </span>
                      <span className="text-gray-300">&bull;</span>
                    </>
                  )}

                  <span>{doc.documentType || "Unknown Type"}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-500 bg-transparent text-gray-800 text-sm font-medium transition-all duration-200
                          ease-in-out hover:bg-[#1A1D2D]/5 hover:cursor-pointer disabled:opacity-50
                          disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100"
                onClick={redirectToOriginalFile}
              >
                <ExternalLink size={18} />
                <span>Show original file</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default DocumentDetailsHeader;
