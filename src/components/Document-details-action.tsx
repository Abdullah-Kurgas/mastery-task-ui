import { Save } from "lucide-react";
import React, { MouseEventHandler } from "react";

const DocumentDetailsAction = ({
  isSubmitting,
  isValid,
  dirty,
  isSubtotalValid,
  isTotalTaxValid,
  isTotalAmountValid,
  totalsRecalculated,
  reCalculateTotals,
  setTotalsRecalculated,
}: {
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
  isSubtotalValid: boolean;
  isTotalTaxValid: boolean;
  isTotalAmountValid: boolean;
  totalsRecalculated: boolean;
  reCalculateTotals: MouseEventHandler;
  setTotalsRecalculated: any;
}): React.ReactElement => {
  const onReCalculateTotals = (e: React.MouseEvent<Element, MouseEvent>) => {
    reCalculateTotals(e);
    setTotalsRecalculated(true);
  };

  return (
    <div>
      <div className="flex items-center justify-end w-full gap-3 pt-15">
        {(!isSubtotalValid || !isTotalTaxValid || !isTotalAmountValid) &&
          !totalsRecalculated && (
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-500 bg-transparent text-gray-800 text-sm font-medium transition-all duration-200
                                          ease-in-out hover:bg-[#1A1D2D]/5 hover:cursor-pointer disabled:opacity-50
                                          disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100"
              disabled={isSubmitting}
              onClick={onReCalculateTotals}
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
            ((!isSubtotalValid || !isTotalTaxValid || !isTotalAmountValid) &&
              !totalsRecalculated)
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
  );
};

export default DocumentDetailsAction;
