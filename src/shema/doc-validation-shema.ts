import * as Yup from "yup";

export const docValidationSchema = Yup.object({
  documentType: Yup.string().required().min(1),
  documentNumber: Yup.string().trim().required().min(1),
  supplier: Yup.string().trim().required().min(1),
  issueDate: Yup.date().required(),
  dueDate: Yup.date()
    .min(Yup.ref("issueDate"), "Due date can't be before issue date")
    .required(),
  currency: Yup.string().trim().required().min(3),
  taxPercent: Yup.number().optional(),
  lineItems: Yup.array(
    Yup.object({
      description: Yup.string().trim().required().min(3),
      quantity: Yup.number().required().min(1),
      unitPrice: Yup.number().required().min(1),
      total: Yup.number().required().min(1),
    }),
  ).min(1),
  subtotal: Yup.number().required(),
  taxAmount: Yup.number().optional(),
  totalAmount: Yup.number().optional(),
});
