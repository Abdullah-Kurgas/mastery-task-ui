import { CircleAlert } from "lucide-react";

const TotalsWrapper = ({
  currency,
  taxPercent,
  cSubtotal,
  cTotalTax,
  cTotalAmount,
  subtotal,
  totalTax,
  totalAmount,
  shouldCheck,
  totalsRecalculated
}: {
  currency: string;
  taxPercent: number;
  cSubtotal: number;
  cTotalTax: number;
  cTotalAmount: number;
  subtotal: number;
  totalTax: number;
  totalAmount: number;
  shouldCheck: boolean;
  totalsRecalculated: boolean
}): React.ReactElement => {
  return (
    <div className="w-full text-sm space-y-2">
      <div className="flex justify-between items-center text-gray-700">
        <span>Subtotal</span>

        <div className="flex items-center gap-2">
          {subtotal != cSubtotal && shouldCheck && !totalsRecalculated && (
            <CircleAlert size={14} color="red" />
          )}

          <span className="font-semibold">
            {(shouldCheck && !totalsRecalculated ? subtotal : cSubtotal).toFixed(2)} {currency}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center text-gray-700">
        <span>Tax Total ({taxPercent}%)</span>

        <div className="flex items-center gap-2">
          {totalTax != cTotalTax && shouldCheck && !totalsRecalculated && (
            <CircleAlert size={14} color="red" />
          )}

          <span className="font-semibold">
            {(shouldCheck && !totalsRecalculated ? totalTax : cTotalTax).toFixed(2)} {currency}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center text-base mt-4">
        <span className="font-bold text-gray-900">Total Amount</span>

        <div className="flex items-center gap-2">
          {totalAmount != cTotalAmount && shouldCheck && !totalsRecalculated && (
            <CircleAlert size={17} color="red" />
          )}

          <span className="font-bold text-gray-900">
            {(shouldCheck && !totalsRecalculated ? totalAmount : cTotalAmount).toFixed(2)} {currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalsWrapper;
