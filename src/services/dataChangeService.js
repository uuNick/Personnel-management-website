import axios from 'axios';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

class dataChangeService {

    async getAllDataChanges() {
        try {
            const response = await axios.get(`${hostServer}dataChanges`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Ошибка при получении изменения данных: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении изменения данных: ${error}`);
            }
        }
    }

    async getPartDataChanges(page, limit) {
        try {
            const response = await axios.get(`${hostServer}dataChanges/pag?page=${page}&limit=${limit}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении изменения данных: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении изменения данных: ${error}`);
            }
        }
    }

    async getPartSortedDataChanges(page, limit, sortBy, order = "ASC") {
        try {
            const response = await axios.get(`${hostServer}dataChanges/sorted?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении изменения данных: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении изменения данных: ${error}`);
            }
        }
    }

    async getPartSearchByDateAndSortDataChanges(page, limit, start_date, end_date, sortBy, order = "ASC") {
        try {
            const response = await axios.get(`${hostServer}dataChanges/search_by_date_and_sort?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении изменения данных: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении изменения данных: ${error}`);
            }
        }
    }

    async getPartSearchByDateDataChanges(page, limit, start_date, end_date) {
        try {
            const response = await axios.get(`${hostServer}dataChanges/search_by_date?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении изменения данных: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении изменения данных: ${error}`);
            }
        }
    }

    async createDataChange(data) {
        try {
            const response = await axios.post(`${hostServer}dataChanges/`, data);

            if (response.status === 201) {
                return response;
            } else {
                throw new Error(`Ошибка при создании изменения данных: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при создании изменения данных: ${error}`);
            }
        }
    }
}

export default new dataChangeService();