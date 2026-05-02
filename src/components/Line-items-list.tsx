import { FieldArray } from "formik";
import { LineItem } from "../models/line-item";
import LineItemC from "./Line-item";
import { Plus } from "lucide-react";

function LineItemsList({ lineItems }: { lineItems: LineItem[] }) {
  return (
    <>
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-4">Line items</h2>

        <div className="flex gap-2 text-gray-600 mb-2">
          <div className="w-3/5">Description</div>
          <div className="w-1/6">Quantity</div>
          <div className="w-1/5">Price</div>
          <div className="w-1/5 text-end font-bold">Total</div>
        </div>

        <FieldArray name="lineItems">
          {({ push, remove }) => (
            <div className="space-y-4">
              {lineItems.map((_, index) => (
                <LineItemC
                  key={index}
                  name={`lineItems[${index}]`}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ))}

              <button
                type="button"
                onClick={() =>
                  push({ description: "", quantity: 1, unitPrice: 0, total: 0 })
                }
                className="flex items-center gap-1 px-4 py-2.5 bg-transparent text-blue-600 text-sm font-medium rounded-xl hover:cursor-pointer hover:bg-blue-50 active:bg-blue-100 transition-colors w-fit"
              >
                <Plus size={18} />
                Add Line Item
              </button>
            </div>
          )}
        </FieldArray>

        {!lineItems.length && (
          <div className="flex py-10 text-gray-500">
            <span className="text-center w-full">No items found</span>
          </div>
        )}
      </div>
    </>
  );
}

export default LineItemsList;
