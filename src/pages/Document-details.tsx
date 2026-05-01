import { Calendar, ChevronDown, Percent } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { documentService } from "../services/document-service";
import DocumentDetailsSkeleton from "../components/Document-details-skeleton";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Document } from "../models/document";
import LineItemsList from "../components/Line-items-list";

const validationSchema = Yup.object({
  documentType: Yup.string().required().min(1),
  documentNumber: Yup.string().required().min(1),
  supplier: Yup.string().required().min(1),
  issueDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  dueDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  currency: Yup.string().required(),
  taxPercent: Yup.number().optional(),
  lineItems: Yup.array(
    Yup.object({
      description: Yup.string().required().min(2),
      quantity: Yup.number().required().min(1),
      unitPrice: Yup.number().required().min(1),
      total: Yup.number().required().min(1),
    }),
  ).min(1),
});

/*
    subtotal: z.number().optional(),
    taxAmount: z.number().optional(),
    totalAmount: z.number().optional(),
*/

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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>=\[][]</div>
      </div>

      {isLoading ? (
        <DocumentDetailsSkeleton />
      ) : (
        <div className="flex flex-col lg:flex-row mx-auto gap-6">
          <Formik
            initialValues={data?.data!}
            validationSchema={validationSchema}
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
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="min-w-lg rounded-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
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
                            className={`w-full border rounded-lg p-2.5 appearance-none focus:outline-none focus:border-blue-500 ${
                              errors.documentType
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-200"
                            }`}
                          >
                            <option>Invoice</option>
                            <option>Purchase order</option>
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

                    <div className="mb-4">
                      <h2 className="font-semibold text-lg mb-4">Line items</h2>

                      <LineItemsList lineItems={values.lineItems} />

                      {!values.lineItems.length && (
                        <div className="flex py-10 text-gray-500">
                          <span className="text-center w-full">
                            No items found
                          </span>
                        </div>
                      )}
                    </div>

                    <hr className="border-gray-300 border-dashed my-6" />

                    <div className="w-fit space-y-4 ms-auto">
                      <div className="grid grid-cols-[1fr_auto] items-center gap-x-12">
                        <span className="text-right">Subtotal</span>

                        <span className="text-right tabular-nums ">
                          {data?.data.subtotal}
                        </span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] items-center gap-x-12">
                        <span className="text-right">Subtotal</span>

                        <span className="text-right tabular-nums ">
                          {data?.data.subtotal}
                        </span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] items-center gap-x-12">
                        <span className="text-right">Subtotal</span>

                        <span className="text-right tabular-nums ">
                          {data?.data.subtotal}
                        </span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] items-center gap-x-12">
                        <span className="text-right">Subtotal</span>

                        <span className="text-right tabular-nums ">
                          {data?.data.subtotal}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between w-full gap-10 pt-15">
                      <span className="text-gray-400 text-[15px] tracking-tight">
                        Last saved: Today at 4:30
                      </span>

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
            )}
          </Formik>

          <div className="w-full flex flex-col relative"></div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetails;
