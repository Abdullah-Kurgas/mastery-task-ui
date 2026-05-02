import { Calendar, ChevronDown, Percent } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { documentService } from "../services/document-service";
import DocumentDetailsSkeleton from "../components/Document-details-skeleton";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "sonner";
import { Document } from "../models/document";
import LineItemsList from "../components/Line-items-list";
import DocumentDetailsHeader from "../components/Document-details-header";
import TotalsWrapper from "../components/Totals-wrapper";
import { DocumentType } from "../enums/document-type";
import { docValidationSchema } from "../shema/doc-validation-shema";

const DocumentDetails = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["documentData", id],
    queryFn: () => documentService.getDocumentDetails(id!),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const updateDocumentData = async (
    id: string,
    changes: any,
  ): Promise<Document> => {
    const updatedDoc = await documentService.updateDocumentData(id, changes);
    return updatedDoc;
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50 px-10 p-6 font-sans text-gray-800 overflow-hidden">
      <DocumentDetailsHeader />

      {!isLoading ? (
        <DocumentDetailsSkeleton />
      ) : (
        <div className="flex flex-col justify-around lg:flex-row gap-10 h-full overflow-auto">
          <Formik
            initialValues={data?.data!}
            validationSchema={docValidationSchema}
            validateOnMount={true}
            onSubmit={async (values, { setSubmitting }) => {
              const {
                _id,
                createdAt,
                mediaType,
                name,
                path,
                size,
                status,
                updatedAt,
                __v,
                ...changes
              } = values as any;

              toast.promise(updateDocumentData(_id, changes), {
                loading: "Updating document data...",
                success: (data) => {
                  return `Successfully updated!, ${data.name}`;
                },
                error: (err) => `${err.message}`,
              });

              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              dirty,
            }) => {
              const subtotal = values.lineItems.reduce(
                (a, b) => a + (b.total || 0),
                0,
              );
              const totalTax = Number(
                (subtotal * ((values.taxPercent || 0) / 100)).toFixed(2),
              );
              const totalAmount = Number(subtotal) + Number(totalTax);

              return (
                <form onSubmit={handleSubmit}>
                  <div className="min-w-xl rounded-xl w-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">
                        Document Details
                      </h2>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label className="block text-gray-600 mb-1">
                            Supplier / Company name
                          </label>
                          <input
                            className={`w-full border rounded-lg p-2.5 focus:outline-none focus:border-blue-500 bg-gray-50 ${
                              errors.supplier
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-200"
                            }`}
                            type="text"
                            name="supplier"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.supplier || ""}
                          />
                        </div>

                        <div className="w-1/2">
                          <label className="block text-gray-600 mb-1">
                            Document Type
                          </label>
                          <div className="relative">
                            <select
                              name="documentType"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.documentType || ""}
                              className={`w-full border rounded-lg p-2.5 appearance-none focus:outline-none focus:border-blue-500 ${
                                errors.documentType
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-200"
                              }`}
                            >
                              <option value={""}>--</option>
                              <option value={DocumentType.INVOICE}>
                                {DocumentType.INVOICE}
                              </option>
                              <option value={DocumentType.PURCHASE_ORDER}>
                                {DocumentType.PURCHASE_ORDER}
                              </option>
                            </select>

                            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-600 mb-1">
                          Document number
                        </label>
                        <input
                          className={`w-full border rounded-lg p-2.5 focus:outline-none focus:border-blue-500 bg-gray-50 ${
                            errors.documentNumber
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-200"
                          }`}
                          type="text"
                          name="documentNumber"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.documentNumber || ""}
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label className="block text-gray-600 mb-1">
                            Issue Date
                          </label>
                          <div className="relative">
                            <input
                              className={`w-full border rounded-lg p-2.5 focus:outline-none focus:border-blue-500 ${
                                errors.issueDate
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-200"
                              }`}
                              type="date"
                              name="issueDate"
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.issueDate || ""}
                            />

                            <Calendar className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <label className="block text-gray-600 mb-1">
                            Due Date
                          </label>
                          <div className="relative">
                            <input
                              className={`w-full border rounded-lg p-2.5 focus:outline-none focus:border-blue-500 ${
                                errors.dueDate
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-200"
                              }`}
                              type="date"
                              name="dueDate"
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.dueDate || ""}
                            />

                            <Calendar className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label className="block text-gray-600 mb-1">
                            Currency
                          </label>
                          <input
                            className={`w-full border rounded-lg p-2.5 focus:outline-none focus:border-blue-500 ${
                              errors.currency
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-200"
                            }`}
                            type="text"
                            name="currency"
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.currency || ""}
                          />
                        </div>

                        <div className="w-1/2">
                          <label className="block text-gray-600 mb-1">
                            Tax percentage
                          </label>
                          <div className="relative">
                            <input
                              className={`w-full border rounded-lg p-2.5 focus:outline-none focus:border-blue-500 ${
                                errors.taxPercent
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-200"
                              }`}
                              type="number"
                              name="taxPercent"
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.taxPercent || 0}
                            />

                            <Percent className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <hr className="border-gray-300 border-dashed my-6" />

                      <LineItemsList lineItems={values.lineItems} />

                      <hr className="border-gray-300 border-dashed my-6" />

                      <TotalsWrapper
                        subtotal={subtotal}
                        currency={values.currency || ""}
                        totalTax={totalTax}
                        taxPercent={values.taxPercent || 0}
                        totalAmount={totalAmount}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between w-full gap-10 pt-15">
                        <button
                          className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#1A1D2D] text-white text-sm font-medium transition-all duration-200
                                  ease-in-out hover:bg-[#2a2f45] active:scale-[0.98] hover:cursor-pointer disabled:opacity-50
                                  disabled:cursor-not-allowed disabled:hover:bg-[#1A1D2D] disabled:active:scale-100"
                          disabled={isSubmitting || !isValid || !dirty}
                        >
                          {isSubmitting ? (
                            <div className="flex gap-[3.5px] px-7.5 py-1.5">
                              <span className="h-2 w-2 rounded-full bg-slate-300 animate-[pulse_1s_infinite_0ms]"></span>
                              <span className="h-2 w-2 rounded-full bg-slate-300 animate-[pulse_1s_infinite_200ms]"></span>
                              <span className="h-2 w-2 rounded-full bg-slate-300 animate-[pulse_1s_infinite_400ms]"></span>
                            </div>
                          ) : (
                            <span>Save changes</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>

          <div className="w-xl flex flex-col relative">
            <div>
              <h2 className="font-semibold text-lg mb-4">Preview</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetails;
