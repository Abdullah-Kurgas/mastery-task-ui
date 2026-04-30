import { DocumentStatus } from "../enums/document-status";
import { MediaType } from "../enums/media-type";
import { LineItem } from "./line-item";

export interface Document {
    _id: string;
    name: string;
    path: string;
    documentType: string | null;
    supplier: string | null;
    documentNumber: string | null;
    issueDate: Date | null;
    dueDate: Date | null;
    currency: string | null;
    subtotal: number | null;
    taxAmount: number | null;
    taxPercent: string | null;
    totalAmount: number | null;
    status: DocumentStatus;
    mediaType: MediaType;
    size: number;
    lineItems: LineItem[],
    createdAt: Date;
    updatedAt: Date;
}