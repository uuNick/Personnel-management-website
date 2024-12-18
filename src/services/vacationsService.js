import axios from 'axios';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

class vacationService {
    async getPartVacations(page, limit) {
        try {
            const response = await axios.get(`${hostServer}vacations/pag?page=${page}&limit=${limit}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении отпусков: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении отпусков: ${error}`);
            }
        }
    }

    async getPartSortedVacations(page, limit, sortBy, order) {
        try {
            const response = await axios.get(`${hostServer}vacations/sorted?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении отпусков: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении отпусков: ${error}`);
            }
        }
    }

    async getPartSearchByDateAndSortVacations(page, limit, start_date, end_date, sortBy, order) {
        try {
            const response = await axios.get(`${hostServer}vacations/search_by_date_and_sort?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении отпусков: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении отпусков: ${error}`);
            }
        }
    }

    async getPartSearchByDateVacations(page, limit, start_date, end_date) {
        try {
            const response = await axios.get(`${hostServer}vacations/search_by_dates?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении отпусков: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении отпусков: ${error}`);
            }
        }
    }

    async getPartSearchByEmployeeIdVacations(page, limit, employee_id) {
        try {
            const response = await axios.get(`${hostServer}vacations/search_by_emp_id?page=${page}&limit=${limit}&employee_id=${employee_id}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении отпусков: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении отпусков: ${error}`);
            }
        }
    }

    async createVacation(data) {
        try {
            const response = await axios.post(`${hostServer}vacations/`, data);

            if (response.status === 201) {
                return response;
            } else {
                throw new Error(`Ошибка при создании отпуска: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при создании отпуска: ${error}`);
            }
        }
    }
}

export default new vacationService();