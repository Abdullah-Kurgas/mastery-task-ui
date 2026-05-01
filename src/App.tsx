import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DocumentDetails from "./pages/Document-details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="bottom-right" richColors />

        <div className="flex min-h-screen bg-slate-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/documents/:id/details"
              element={<DocumentDetails />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
