import { FileText } from "lucide-react";
import { Document } from "../models/document";
import { useNavigate } from "react-router-dom";
import { DocumentStatus } from "../enums/document-status";

export const DocumentItem = ({ doc }: { doc: Document }) => {
  const navigate = useNavigate();

  return (
    <li
      key={doc._id}
      onClick={() => navigate(`/documents/${doc._id}/details`)}
      className="p-4 hover:cursor-pointer hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between border-b border-gray-100 last:border-0"
    >
      <div className="flex items-center space-x-4 min-w-0">
        <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
          <FileText />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900 truncate">
              {doc.name} {doc.documentNumber ? `(${doc.documentNumber})` : ""}
            </span>

            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                doc.status === DocumentStatus.VALIDATED
                  ? "bg-green-100 text-green-700"
                  : doc.status === DocumentStatus.NEEDS_REVIEW
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {doc.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-1 mt-1 text-xs text-gray-500">
            {doc.supplier && (
              <>
                <span className="font-medium text-gray-600">
                  {doc.supplier}
                </span>
                <span className="text-gray-300">&bull;</span>
              </>
            )}
            <span>{doc.documentType || "Unknown Type"}</span>

            {doc.issueDate && (
              <>
                <span className="text-gray-300">&bull;</span>
                <span>{new Date(doc.issueDate).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 shrink-0 pl-4">
        {doc.totalAmount !== null && (
          <div className="flex flex-col items-end mr-2">
            <span className="text-sm font-semibold text-gray-900">
              {doc.totalAmount} {doc.currency}
            </span>
            {doc.dueDate && (
              <small className="text-[11px] text-gray-400">
                Due: {new Date(doc.dueDate).toLocaleDateString()}
              </small>
            )}
          </div>
        )}
      </div>
    </li>
  );
};
