import axios from 'axios';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

class sickLeaveService {
    async getPartSickLeaves(page, limit) {
        try {
            const response = await axios.get(`${hostServer}sickLeaves/pag?page=${page}&limit=${limit}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении больничных листов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении больничных листов: ${error}`);
            }
        }
    }

    async getPartSortedSickLeaves(page, limit, sortBy, order) {
        try {
            const response = await axios.get(`${hostServer}sickLeaves/sorted?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении больничных листов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении больничных листов: ${error}`);
            }
        }
    }

    async getPartSearchByDateAndSortSickLeaves(page, limit, start_date, end_date, sortBy, order) {
        try {
            const response = await axios.get(`${hostServer}sickLeaves/search_by_date_and_sort?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении больничных листов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении больничных листов: ${error}`);
            }
        }
    }

    async getPartSearchByDateSickLeaves(page, limit, start_date, end_date) {
        try {
            const response = await axios.get(`${hostServer}sickLeaves/search_by_dates?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении больничных листов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении больничных листов: ${error}`);
            }
        }
    }
}

export default new sickLeaveService();