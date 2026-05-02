import * as Yup from "yup";

export const docValidationSchema = Yup.object({
    documentType: Yup.string().required().min(1),
    documentNumber: Yup.string().trim().required().min(1),
    supplier: Yup.string().trim().required().min(1),
    issueDate: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .required(),
    dueDate: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
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
    totalAmount: Yup.number().optional()
});