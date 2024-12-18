import axios from 'axios';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

class documentService {
    async getDocumentById(document_id) {
        try {
            const response = await axios.get(`${hostServer}documents/${document_id}`);
            if (response.status === 200) {
                return response;
            } else if (response.status === 404) {
                throw new Error('Документ с указанным ID не найден');
            }
            else {
                throw new Error(`Ошибка при получении документа: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении документа: ${error}`);
            }
        }
    }

    async getAllDocuments() {
        try {
            const response = await axios.get(`${hostServer}documents/`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Ошибка при получении джокументов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при документов: ${error}`);
            }
        }
    }

    async createDocument(formData) {
        try {
            const response = await axios.post(`${hostServer}documents/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (response.status === 201) {
                return response;
            } else {
                throw new Error(`Ошибка при создании работника: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при создании работника: ${error}`);
            }
        }
    }


}

export default new documentService();