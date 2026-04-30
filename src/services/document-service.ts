import { AxiosResponse } from "axios";
import { Document } from "../models/document";
import apiManager from "./config";

const API_BASE_URL = '/api/documents';

export const documentService = {
    async getDocuments(): Promise<AxiosResponse<Document[]>> {
        return apiManager.get(API_BASE_URL);
    },

    async uploadDocument(document: File): Promise<AxiosResponse<Document>> {
        const formData = new FormData();
        formData.append('document', document);

        return apiManager.post(`${API_BASE_URL}/upload`, formData);
    }
};