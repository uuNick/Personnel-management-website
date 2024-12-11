import axios from 'axios';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

class employeeService {
    async getAllEmployees() {
        try {
            const response = await axios.get(`${hostServer}employees`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Ошибка при получении работников: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении работников: ${error}`);
            }
        }
    }

    async getPartEmployees(page, limit) {
        try {
            const response = await axios.get(`${hostServer}employees/pag?page=${page}&limit=${limit}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении работников: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении работников: ${error}`);
            }
        }
    }

    async getPartFindEmployee(page, limit, search) {
        try {
            const response = await axios.get(`${hostServer}employees/search?page=${page}&limit=${limit}&search=${search}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении работников: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении работников: ${error}`);
            }
        }
    }

    async getPartSortEmployee(page, limit, sortBy, order) {
        try {
            const response = await axios.get(`${hostServer}employees/sorted?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении работников: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении работников: ${error}`);
            }
        }
    }

    async getPartFindAndSortEmployees(page, limit, search, sortBy, order) {
        try {
            const response = await axios.get(`${hostServer}employees/search_and_sort?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении работников: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении работников: ${error}`);
            }
        }
    }
}

export default new employeeService();