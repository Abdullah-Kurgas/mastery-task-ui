const TotalsWrapper = ({
  subtotal,
  currency,
  totalTax,
  taxPercent,
  totalAmount,
}: {
  subtotal: number;
  currency: string;
  totalTax: number;
  taxPercent: number;
  totalAmount: number;
}): React.ReactElement => {
  return (
    <div className="w-full text-sm space-y-2">
      <div className="flex justify-between items-center text-gray-700">
        <span>Subtotal</span>
        <span className="font-semibold">{subtotal} {currency}</span>
      </div>

      <div className="flex justify-between items-center text-gray-700">
        <span>Tax Total ({taxPercent}%)</span>
        <span className="font-semibold">{totalTax} {currency}</span>
      </div>

      <div className="flex justify-between items-center text-base mt-4">
        <span className="font-bold text-gray-900">Total Amount</span>
        <span className="font-bold text-gray-900">{totalAmount} {currency}</span>
      </div>
    </div>
  );
};

export default TotalsWrapper;
