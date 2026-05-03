import { AxiosResponse } from "axios";
import { Document } from "../models/document";
import apiManager from "./config";
import { DocumentDTO, documentDTOMap } from "../payloads/document-dto";

const API_BASE_URL = '/api/documents';

export const documentService = {
    async getDocuments(): Promise<Document[]> {
        return apiManager.get(API_BASE_URL).then(res => res.data);
    },

    async getDocumentDetails(id: string): Promise<Document> {
        return apiManager.get(`${API_BASE_URL}/details/${id}`).then(res => res.data);
    },

    async uploadDocument(document: File): Promise<AxiosResponse<Document>> {
        const formData = new FormData();
        formData.append('document', document);

        return apiManager.post(`${API_BASE_URL}/upload`, formData);
    },

    async updateDocumentData(id: string, changes: Document): Promise<Document> {
        const filteredPayload: DocumentDTO = Object.keys(changes).reduce((acc: any, key) => {
            if (documentDTOMap.includes(key)) {
                acc[key] = (changes as any)[key];
            }

            return acc;
        }, {});

        return apiManager.put(`${API_BASE_URL}/${id}`, filteredPayload).then(res => res.data);
    }


};