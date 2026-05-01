import { useState } from "react";
import UploadWrapper from "../components/Upload-wrapper";
import DocumentList from "../components/Document-list";

const Dashboard = (): React.ReactElement => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "invoice_march_2026.pdf",
      size: "1.2 MB",
      status: "Processed",
      date: "2026-04-28",
    },
    {
      id: 2,
      name: "contract_draft_v2.docx",
      size: "850 KB",
      status: "Processing",
      date: "2026-04-29",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 p-8 w-full">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-slate-900">
            Smart Document Processing System
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your file upload and validation workflows.
          </p>
        </header>

        <UploadWrapper />

        <DocumentList />
      </div>
    </div>
  );
}

export default Dashboard;
