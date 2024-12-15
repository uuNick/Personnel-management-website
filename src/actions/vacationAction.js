import {
    FETCH_VACATIONS,
    FETCH_PART_VACATIONS_SUCCESS,
    FETCH_SORTED_PART_VACATIONS_SUCCESS,
    FETCH_SEARCH_AND_SORT_SUCCESS_VACATIONS,
    FETCH_SEARCH_PART_SUCCESS_VACATIONS,
    FETCH_VACATIONS_FAILURE,
    SET_CURRENT_PAGE,
    FETCH_VACATIONS_BY_ID_SUCCESS
} from '../actionTypes';
import VacationService from "../services/vacationsService";


export const getPartVacations = (page = 1, limit = 10) => async (dispatch) => {
    dispatch({ type: FETCH_VACATIONS });
    try {
        const response = await VacationService.getPartVacations(page, limit);
        dispatch({ type: FETCH_PART_VACATIONS_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_VACATIONS_FAILURE, payload: error.message });
    }
};

export const getPartSortedVacations = (page = 1, limit = 10, sortBy = "start_date", order = "ASC") => async (dispatch) => {
    dispatch({ type: FETCH_VACATIONS });
    try {
        const response = await VacationService.getPartSortedVacations(page, limit, sortBy, order);
        dispatch({ type: FETCH_SORTED_PART_VACATIONS_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_VACATIONS_FAILURE, payload: error.message });
    }
};

export const getPartSearchByDateAndSortVacations = (page = 1, limit = 10, start_date, end_date, sortBy, order = "ASC") => async (dispatch) => {
    dispatch({ type: FETCH_VACATIONS });
    try {
        const response = await VacationService.getPartSearchByDateAndSortVacations(page, limit, start_date, end_date, sortBy, order);
        dispatch({ type: FETCH_SEARCH_AND_SORT_SUCCESS_VACATIONS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_VACATIONS_FAILURE, payload: error.message });
    }
}

export const getPartSearchByDateVacations = (page = 1, limit = 10, start_date, end_date) => async (dispatch) => {
    dispatch({ type: FETCH_VACATIONS });
    try {
        const response = await VacationService.getPartSearchByDateVacations(page, limit, start_date, end_date);
        dispatch({ type: FETCH_SEARCH_PART_SUCCESS_VACATIONS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_VACATIONS_FAILURE, payload: error.message });
    }
}

export const getPartSearchByEmployeeIdVacations = (page = 1, limit = 10, employee_id) => async (dispatch) => {
    dispatch({ type: FETCH_VACATIONS });
    try {
        const response = await VacationService.getPartSearchByEmployeeIdVacations(page, limit, employee_id);
        dispatch({ type: FETCH_SEARCH_PART_SUCCESS_VACATIONS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_VACATIONS_FAILURE, payload: error.message });
    }
}

export const updateCurrentPageForVacation = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});