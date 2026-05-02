import { useQuery } from "@tanstack/react-query";
import React from "react";
import { documentService } from "../services/document-service";
import { DocumentItem } from "./Document-item";
import DocumentListSkeleton from "./Document-list-skeleton";

const DocumentList = (): React.ReactElement => {
  const { data: documents, isLoading } = useQuery({
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

      {documents?.length || isLoading ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {isLoading
              ? [...Array(3)].map((_, index) => (
                  <DocumentListSkeleton key={index} />
                ))
              : documents?.map((doc) => (
                  <DocumentItem key={doc._id} doc={doc} />
                ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-5 text-gray-700">
          <span>No documents uploaded</span>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
