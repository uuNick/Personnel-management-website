import axios from 'axios';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

class dayOffService {
    async getPartDayOff(page, limit) {
        try {
            const response = await axios.get(`${hostServer}daysOff/pag?page=${page}&limit=${limit}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении прогулов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении прогулов: ${error}`);
            }
        }
    }

    async getPartSortedDaysOff(page, limit, sortBy, order) {
        try {
            const response = await axios.get(`${hostServer}daysOff/sorted?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении прогулов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении прогулов: ${error}`);
            }
        }
    }

    async getPartSearchByDateAndSortDaysOff(page, limit, start_date, end_date, sortBy, order) {
        try {
            const response = await axios.get(`${hostServer}daysOff/search_by_date_and_sort?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}&sortBy=${sortBy}&order=${order}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении прогулов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении прогулов: ${error}`);
            }
        }
    }

    async getPartSearchByDateDaysOff(page, limit, start_date, end_date) {
        try {
            const response = await axios.get(`${hostServer}daysOff/search_by_dates?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении прогулов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении прогулов: ${error}`);
            }
        }
    }

    async getPartSearchByEmployeeIdDaysOff(page, limit, employee_id) {
        try {
            const response = await axios.get(`${hostServer}daysOff/search_by_emp_id?page=${page}&limit=${limit}&employee_id=${employee_id}`);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Ошибка при получении прогулов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении прогулов: ${error}`);
            }
        }
    }

    async getAllSearchByEmployeeIdDaysOff(employee_id) {
        try {
            const response = await axios.get(`${hostServer}daysOff/search_all_by_emp_id?employee_id=${employee_id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Ошибка при получении прогулов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении прогулов: ${error}`);
            }
        }
    }

    async createDayOff(data) {
        try {
            const response = await axios.post(`${hostServer}daysOff/`, data);

            if (response.status === 201) {
                return response;
            } else {
                throw new Error(`Ошибка при создании прогула: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при создании прогула: ${error}`);
            }
        }
    }

    async getAllDaysOff() {
        try {
            const response = await axios.get(`${hostServer}daysOff`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Ошибка при получении прогулов: ${response.data.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при получении прогулов: ${error}`);
            }
        }
    }

    async deleteDayOff(day_off_id) {
        try {
            const response = await axios.delete(`${hostServer}daysOff/${day_off_id}`);

            if (response.status === 204) {
                return response;
            } else {
                throw new Error(`Ошибка при удалении прогула: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('Ошибка сети');
            } else {
                throw new Error(`Произошла ошибка при удалении прогула: ${error}`);
            }
        }
    }
}

export default new dayOffService();