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
}

export default new employeeService();