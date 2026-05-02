import React from "react";
import {
  AlertCircle,
  Calendar,
  Hash,
  DollarSign,
} from "lucide-react";
import { Document } from "../models/document";

const DocumentPreview = ({ data }: { data: Document }): React.ReactElement => {
  const hasWarning = (field: keyof Document) => data[field] === null;

  // Helper for currency formatting
  const formatCurrency = (val: any) => {
    if (val === null || val === undefined) return "---";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: data.currency || "USD",
    }).format(val);
  };

  return (
    <div className="flex flex-col h-full w-96 border-l border-slate-200 bg-white shadow-xl overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            {data.documentType || "Unknown Type"}
          </span>
          {/* {warningFields.length > 0 && (
            <span className="flex items-center gap-1 text-amber-600 text-xs font-medium">
              <AlertCircle size={14} /> {warningFields.length} actions needed
            </span>
          )} */}
        </div>
        <h2 className="text-xl font-bold text-slate-800 leading-tight">
          {data.supplier || (
            <span className="text-slate-400 italic font-normal">
              Missing Supplier
            </span>
          )}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* General Details Section */}
        <section>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            General Details
          </h3>
          <div className="grid grid-cols-1 gap-y-4">
            <FieldRow
              icon={<Hash size={16} />}
              label="Document #"
              value={data.documentNumber}
              warning={hasWarning("documentNumber")}
            />
            <FieldRow
              icon={<Calendar size={16} />}
              label="Issue Date"
              value={data.issueDate}
              warning={hasWarning("issueDate")}
            />
            <FieldRow
              icon={<Calendar size={16} />}
              label="Due Date"
              value={data.dueDate}
              warning={hasWarning("dueDate")}
            />
          </div>
        </section>

        {/* Financials Section */}
        <section className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <DollarSign size={14} /> Financial Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">
                {formatCurrency(data.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span className="flex items-center gap-1">
                Tax ({data.taxPercent ?? 0}%)
                {hasWarning("taxAmount") && (
                  <AlertCircle size={12} className="text-amber-500" />
                )}
              </span>
              <span className="font-medium text-slate-900">
                {formatCurrency(data.taxAmount)}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-800">Total Amount</span>
              <div className="flex items-center gap-2">
                {hasWarning("totalAmount") && (
                  <AlertCircle
                    size={18}
                    className="text-amber-500 animate-pulse"
                  />
                )}
                <span
                  className={`text-lg font-black ${hasWarning("totalAmount") ? "text-amber-700" : "text-indigo-600"}`}
                >
                  {formatCurrency(data.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Line Items Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Line Items
            </h3>
            <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold">
              {data.lineItems?.length || 0}
            </span>
          </div>
          <div className="space-y-2">
            {data.lineItems?.map((item, idx) => (
              <div
                key={idx}
                className="group p-3 border border-slate-100 rounded-lg hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-slate-800 line-clamp-1">
                    {item.description || "Untitled Item"}
                  </p>
                  <span className="text-xs font-bold text-slate-900 ml-2">
                    {formatCurrency(item.unitPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>
                    Qty: {item.quantity ?? 1} × {formatCurrency(item.unitPrice)}
                  </span>
                  {/* {item.taxAmount > 0 && (
                    <span>Tax: {formatCurrency(item.taxAmount)}</span>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Action Footer */}
      <div className="p-6 bg-white border-t border-slate-200 grid grid-cols-2 gap-3">
        <button className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          Reject
        </button>
        <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all">
          Approve
        </button>
      </div>
    </div>
  );
};

// Internal Field Component
const FieldRow = ({ icon, label, value, warning }: any) => (
  <div
    className={`flex items-center justify-between p-2 rounded-lg transition-colors ${warning ? "bg-amber-50/50" : "hover:bg-slate-50"}`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`p-1.5 rounded ${warning ? "text-amber-600" : "text-slate-400"}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">
          {label}
        </p>
        <p
          className={`text-sm font-medium ${warning ? "text-amber-900" : "text-slate-700"}`}
        >
          {value || <span className="text-slate-300 italic">Missing</span>}
        </p>
      </div>
    </div>
    {warning && <AlertCircle size={16} className="text-amber-500 shrink-0" />}
  </div>
);

export default DocumentPreview;
