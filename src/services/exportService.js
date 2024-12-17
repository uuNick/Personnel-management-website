import axios from 'axios';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

class exportService {
    async exportExcel(data) {
        try {
            const response = await axios.post(`${hostServer}excel/generate`, data, {
                responseType: 'blob', // <--- Ключевое изменение: указываем, что ожидаем Blob
            });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Ошибка при экспорте таблицы в Excel: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Ошибка при экспорте таблицы в Excel: ${error}`);
            }
        }
    }

    async exportWord(data) {
        try {
            const response = await axios.post(`${hostServer}word/generate`, data, {
                responseType: 'blob',
            });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Ошибка при экспорте таблицы в Word: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Ошибка при экспорте таблицы в Word: ${error}`);
            }
        }
    }
    async exportPdf(data) {
        try {
            const response = await axios.post(`${hostServer}pdf/generate`, data, {
                responseType: 'blob',
            });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Ошибка при экспорте таблицы в PDF: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Ошибка при экспорте таблицы в PDF: ${error}`);
            }
        }
    }

}

export default new exportService();