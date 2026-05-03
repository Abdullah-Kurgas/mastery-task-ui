import { LineItem } from "../models/line-item";

export interface DocumentDTO {
  documentType: string | null;
  supplier: string | null;
  documentNumber: string | null;
  issueDate: string | null;
  dueDate: string | null;
  currency: string | null;
  subtotal: number | null;
  taxAmount: number | null;
  taxPercent: number | null;
  totalAmount: number | null;
  lineItems: LineItem[];
}

export const documentDTOMap: string[] = [
  "documentType",
  "supplier",
  "documentNumber",
  "issueDate",
  "dueDate",
  "currency",
  "subtotal",
  "taxAmount",
  "taxPercent",
  "totalAmount",
  "lineItems",
];
