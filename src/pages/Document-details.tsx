import { Calendar, ChevronDown, Percent, Save } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { documentService } from "../services/document-service";
import DocumentDetailsSkeleton from "../components/Document-details-skeleton";
import { useParams } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import { toast } from "sonner";
import { Document } from "../models/document";
import LineItemsList from "../components/Line-items-list";
import DocumentDetailsHeader from "../components/Document-details-header";
import TotalsWrapper from "../components/Totals-wrapper";
import { DocumentType } from "../enums/document-type";
import { docValidationSchema } from "../shema/doc-validation-shema";
import { useRef } from "react";
import { DocumentStatus } from "../enums/document-status";

const DocumentDetails = () => {
  const { id } = useParams();
  const formikRef = useRef<FormikProps<Document>>(null);
  const subtotalRef = useRef<number>(null);
  const totalTaxRef = useRef<number>(null);
  const totalAmountRef = useRef<number>(null);
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

  const reCalculateTotals = (): void => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("subtotal", subtotalRef.current);
      formikRef.current.setFieldValue("taxAmount", totalTaxRef.current);
      formikRef.current.setFieldValue("totalAmount", totalAmountRef.current);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50 px-10 p-6 font-sans text-gray-800 overflow-hidden tabular-nums">
      <DocumentDetailsHeader />

      {isLoading ? (
        <DocumentDetailsSkeleton />
      ) : (
        <div className="flex flex-col justify-around lg:flex-row gap-10 h-full overflow-auto">
          <Formik
            innerRef={formikRef}
            initialValues={data?.data!}
            validationSchema={docValidationSchema}
            validateOnMount={true}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
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

              const updateParams = {
                ...changes,
                taxPercent: +changes.taxPercent,
                taxAmount: totalTaxRef.current,
                subtotal: subtotalRef.current,
                totalAmount: totalAmountRef.current,
              };

              toast.promise(updateDocumentData(_id, updateParams), {
                loading: "Updating document data...",
                success: (data) => {
                  resetForm({ values: data });
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
              subtotalRef.current = values.lineItems.reduce(
                (a, b) => a + (b.total || 0),
                0,
              );
              totalTaxRef.current = Number(
                subtotalRef.current * ((values.taxPercent || 0) / 100),
              );
              totalAmountRef.current =
                Number(subtotalRef.current) + Number(totalTaxRef.current);

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
                          <div className="relative">
                            <select
                              name="currency"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.currency || ""}
                              className={`w-full border rounded-lg p-2.5 appearance-none focus:outline-none focus:border-blue-500 ${
                                errors.currency
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-200"
                              }`}
                            >
                              <option value={""}>--</option>
                              <option value="BAM">BAM</option>
                              <option value="EUR">EUR</option>
                              <option value="USD">USD</option>
                              <option value="AED">AED</option>
                            </select>

                            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                          </div>
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
                        cSubtotal={subtotalRef.current}
                        cTotalTax={totalTaxRef.current}
                        cTotalAmount={totalAmountRef.current}
                        subtotal={values.subtotal || 0}
                        totalTax={values.taxAmount || 0}
                        totalAmount={values.totalAmount || 0}
                        currency={values.currency || ""}
                        taxPercent={values.taxPercent || 0}
                        shouldCheck={values.status != DocumentStatus.VALIDATED}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-end w-full gap-3 pt-15">
                        {(values.totalAmount != totalAmountRef.current ||
                          values.subtotal != subtotalRef.current ||
                          values.taxAmount != totalTaxRef.current) &&
                          values.status != DocumentStatus.VALIDATED && (
                            <button
                              type="button"
                              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-500 bg-transparent text-gray-800 text-sm font-medium transition-all duration-200
                                  ease-in-out hover:bg-[#1A1D2D]/5 hover:cursor-pointer disabled:opacity-50
                                  disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100"
                              disabled={isSubmitting}
                              onClick={reCalculateTotals}
                            >
                              <span>Recalculate Total</span>
                            </button>
                          )}
                        <button
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A1D2D] text-white text-sm font-medium transition-all duration-200
                                  ease-in-out border border-transparent hover:bg-[#2a2f45] active:scale-[0.98] hover:cursor-pointer disabled:opacity-50
                                  disabled:cursor-not-allowed disabled:hover:bg-[#1A1D2D] disabled:active:scale-100"
                          disabled={
                            isSubmitting ||
                            !isValid ||
                            !dirty ||
                            ((subtotalRef.current != values.subtotal ||
                              totalTaxRef.current != values.taxAmount ||
                              totalAmountRef.current != values.totalAmount) &&
                              values.status != DocumentStatus.VALIDATED)
                          }
                        >
                          {isSubmitting ? (
                            <div className="flex gap-[3.5px] px-7.5 py-1.5">
                              <span className="h-2 w-2 rounded-full bg-slate-300 animate-[pulse_1s_infinite_0ms]"></span>
                              <span className="h-2 w-2 rounded-full bg-slate-300 animate-[pulse_1s_infinite_200ms]"></span>
                              <span className="h-2 w-2 rounded-full bg-slate-300 animate-[pulse_1s_infinite_400ms]"></span>
                            </div>
                          ) : (
                            <>
                              <Save size={18} />
                              <span>Save changes</span>
                            </>
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
