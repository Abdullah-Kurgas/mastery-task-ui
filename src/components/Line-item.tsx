import { useField, useFormikContext } from "formik";
import { Trash2 } from "lucide-react";
import { MouseEventHandler } from "react";

function LineItemC({
  name,
  index,
  disableRemove,
  onRemove,
}: {
  name: string;
  index: number;
  disableRemove: boolean;
  onRemove: MouseEventHandler;
}) {
  const { setFieldValue } = useFormikContext();

  const [descriptionField] = useField(`${name}.description`);
  const [quantityField] = useField(`${name}.quantity`);
  const [unitPriceField] = useField(`${name}.unitPrice`);
  const [totalField] = useField(`${name}.total`);

  const handleUpdate = (fieldName: string, value: number) => {
    setFieldValue(fieldName, value);

    const currentUnitPrice =
      fieldName === unitPriceField.name ? value : unitPriceField.value || 0;
    const currentQuantity =
      fieldName === quantityField.name ? value : quantityField.value || 0;

    setFieldValue(
      `${name}.total`,
      Number(currentUnitPrice) * Number(currentQuantity),
    );
  };

  return (
    <div key={index} className="flex gap-3 mb-3 items-center">
      <div className="w-3/5 relative">
        <input
          {...descriptionField}
          type="text"
          className={`w-full border rounded-lg py-2 px-2.5 focus:outline-none  focus:border-blue-500 ${
            !descriptionField.value
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200"
          }`}
        />
      </div>

      <div className="w-1/8">
        <input
          {...quantityField}
          type="number"
          min={1}
          onChange={(e) => handleUpdate(quantityField.name, +e.target.value)}
          className={`w-full border rounded-lg py-2 px-1 text-sm text-center focus:outline-none focus:border-blue-500 ${
            !quantityField.value
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200"
          }`}
        />
      </div>

      <div className="w-1/5 relative">
        <input
          {...unitPriceField}
          min={1}
          type="number"
          onChange={(e) => handleUpdate(unitPriceField.name, +e.target.value)}
          className={`w-full border rounded-lg py-2 px-2 text-sm focus:outline-none focus:border-blue-500 ${
            !unitPriceField.value
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200"
          }`}
        />
      </div>

      <div className="w-1/5 relative">
        <div className="w-full rounded-lg py-2 text-end font-bold">
          <span>{totalField.value.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-end w-1/12">
        <button
          disabled={disableRemove}
          onClick={(e) => !disableRemove && onRemove(e)}
          className="group p-2 rounded-lg transition-colors duration-200 bg-red-50 hover:cursor-pointer hover:bg-red-100 text-red-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-red-50"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default LineItemC;
