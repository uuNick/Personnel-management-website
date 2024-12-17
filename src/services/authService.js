import axios from 'axios';
import hostServerJSON from "../hostServer.json";
const hostServer = hostServerJSON.path;

export const registration = async (data) => {
    try {
        const response = await axios.post(`${hostServer}auth/registration`, {
            email: data.email,
            username: data.username,
            password: data.password
        });

        if (response.data.message && response.data.message.includes("успешно")) {
            const response_2 = await axios.post(`${hostServer}auth/login`, {
                username: data.username,
                password: data.password
            });
            if (response_2.status === 200) {
                return response_2.data;
            } else if (response_2.status === 403) {
                throw new Error("Введен неверный пароль");
            }
            else if (response_2.status === 404) {
                throw new Error("Пользователь с таким именем не существует");
            }
            else {
                throw new Error(`Ошибка авторизации: ${response.status} ${response.data.message || ''}`);
            }
        }

    }
    catch (error) {
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error('Ошибка сети');
        } else {
            throw new Error(`Произошла ошибка при регистрации: ${error}`);
        }
    }
}

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${hostServer}auth/login`, {
            username,
            password
        })

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 403) {
            throw new Error("Введен неверный пароль");
        }
        else if (response.status === 404) {
            throw new Error("Пользователь с таким именем не существует");
        }
        else {
            throw new Error(`Ошибка авторизации: ${response.status} ${response.data.message || ''}`);
        }
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error('Ошибка сети');
        } else {
            throw new Error(`Произошла ошибка при авторизации: ${error}`);
        }
    }
}

export const resetPasswwordRequest = async (data) => {
    try {
        const response = await axios.post(`${hostServer}auth/reset_pass_req`, {
            email: data.email
        });
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            throw new Error("Адрес электронной почты не зарегистрирован");
        }
        else {
            throw new Error(`Ошибка отправки письма: ${response.status} ${response.data.message || ''}`);
        }

    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error('Ошибка сети');
        } else {
            throw new Error(`Произошла ошибка при запросе на отправку сообщения: ${error}`);
        }
    }
}

export const resetPassword = async (token, data) => {
    try {
        const response = await axios.patch(`${hostServer}auth/reset_pass`, {
            token: token,
            newPassword: data.password,
        })

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404 && response.data.error.includes("токен")) {
            throw new Error("Неверный или просроченный токен");
        } else if (response.status === 404 && response.data.error.includes("Пользователь")) {
            throw new Error("Пользователь не найден");
        }
        else {
            throw new Error(`Ошибка авторизации: ${response.status} ${response.data.message || ''}`);
        }
    }
    catch (error) {
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error('Ошибка сети');
        } else {
            throw new Error(`Произошла ошибка при отправке письма: ${error}`);
        }
    }
}