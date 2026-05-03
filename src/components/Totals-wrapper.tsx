import { CircleAlert } from "lucide-react";
import { Document } from "../models/document";

const TotalsWrapper = ({
  doc,
  currency,
  taxPercent,
  currentSubtotal,
  currentTotalTax,
  currentTotalAmount,
  totalsRecalculated,
}: {
  currency: string;
  taxPercent: number;
  doc: Document;
  currentSubtotal: number;
  currentTotalTax: number;
  currentTotalAmount: number;
  totalsRecalculated: boolean;
}): React.ReactElement => {
  const isSubtotalValid = doc.subtotal == doc.cSubtotal;
  const isTotalTaxValid = doc.taxAmount == doc.cTotalTax;
  const isTotalAmountValid = doc.totalAmount == doc.cTotalAmount;

  return (
    <div className="w-full text-sm space-y-2">
      <div className="flex justify-between items-center text-gray-700">
        <span>Subtotal</span>

        <div className="flex items-center gap-2">
          {!isSubtotalValid && !totalsRecalculated && (
            <CircleAlert size={14} color="red" />
          )}

          <span className="font-semibold">
            {(!isSubtotalValid ? doc.subtotal! : currentSubtotal).toFixed(2)}{" "}
            {currency}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center text-gray-700">
        <span>Tax Total ({taxPercent}%)</span>

        <div className="flex items-center gap-2">
          {!isTotalTaxValid && !totalsRecalculated && (
            <CircleAlert size={14} color="red" />
          )}

          <span className="font-semibold">
            {(!isTotalTaxValid && !totalsRecalculated
              ? doc.taxAmount!
              : currentTotalTax
            ).toFixed(2)}{" "}
            {currency}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center text-base mt-4">
        <span className="font-bold text-gray-900">Total Amount</span>

        <div className="flex items-center gap-2">
          {!isTotalAmountValid && !totalsRecalculated && (
            <CircleAlert size={17} color="red" />
          )}

          <span className="font-bold text-gray-900">
            {(!isTotalAmountValid && !totalsRecalculated
              ? doc.totalAmount!
              : currentTotalAmount
            ).toFixed(2)}{" "}
            {currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalsWrapper;
