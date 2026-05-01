import { AxiosResponse } from "axios";
import { Document } from "../models/document";
import apiManager from "./config";

const API_BASE_URL = '/api/documents';

export const documentService = {
    async getDocuments(): Promise<Document[]> {
        return apiManager.get(API_BASE_URL).then(res => res.data);
    },

    async getDocumentDetails(id: string): Promise<AxiosResponse<Document>> {
        return apiManager.get(`${API_BASE_URL}/details/${id}`);
    },

    async uploadDocument(document: File): Promise<AxiosResponse<Document>> {
        const formData = new FormData();
        formData.append('document', document);

        return apiManager.post(`${API_BASE_URL}/upload`, formData);
    },

    async updateDocumentData(id: string, changes: any): Promise<Document> {
        return apiManager.put(`${API_BASE_URL}/${id}`, changes).then(res => res.data);
    }


};