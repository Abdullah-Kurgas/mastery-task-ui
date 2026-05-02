import UploadWrapper from "../components/Upload-wrapper";
import DocumentList from "../components/Document-list";

const Dashboard = (): React.ReactElement => {
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
