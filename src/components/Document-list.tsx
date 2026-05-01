import { useQuery } from "@tanstack/react-query";
import React from "react";
import { documentService } from "../services/document-service";
import { DocumentItem } from "./Document-item";

const DocumentList = (): React.ReactElement => {
  const {
    data: documents,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["documents"],
    queryFn: documentService.getDocuments,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="s-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">All Documents</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {documents?.map((doc) => (
            <DocumentItem key={doc._id} doc={doc} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentList;
