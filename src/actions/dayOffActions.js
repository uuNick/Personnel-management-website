import {
    FETCH_DAYSOFF,
    FETCH_PART_DAYSOFF_SUCCESS,
    FETCH_SORTED_PART_DAYSOFF_SUCCESS,
    FETCH_SEARCH_AND_SORT_SUCCESS_DAYSOFF,
    FETCH_SEARCH_PART_SUCCESS_DAYSOFF,
    FETCH_DAYSOFF_FAILURE,
    SET_CURRENT_PAGE,
    //FETCH_DAYSOFF_BY_ID_SUCCESS
} from '../actionTypes';
import DayOffService from "../services/dayOffService";


export const getPartDaysOff = (page = 1, limit = 10) => async (dispatch) => {
    dispatch({ type: FETCH_DAYSOFF });
    try {
        const response = await DayOffService.getPartDayOff(page, limit);
        dispatch({ type: FETCH_PART_DAYSOFF_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_DAYSOFF_FAILURE, payload: error.message });
    }
};

export const getPartSortedDaysOff = (page = 1, limit = 10, sortBy = "start_date", order = "ASC") => async (dispatch) => {
    dispatch({ type: FETCH_DAYSOFF });
    try {
        const response = await DayOffService.getPartSortedDaysOff(page, limit, sortBy, order);
        dispatch({ type: FETCH_SORTED_PART_DAYSOFF_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_DAYSOFF_FAILURE, payload: error.message });
    }
};

export const getPartSearchByDateAndSortDaysOff = (page = 1, limit = 10, start_date, end_date, sortBy, order = "ASC") => async (dispatch) => {
    dispatch({ type: FETCH_DAYSOFF });
    try {
        const response = await DayOffService.getPartSearchByDateAndSortDaysOff(page, limit, start_date, end_date, sortBy, order);
        dispatch({ type: FETCH_SEARCH_AND_SORT_SUCCESS_DAYSOFF, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_DAYSOFF_FAILURE, payload: error.message });
    }
}

export const getPartSearchByDateDaysOff = (page = 1, limit = 10, start_date, end_date) => async (dispatch) => {
    dispatch({ type: FETCH_DAYSOFF });
    try {
        const response = await DayOffService.getPartSearchByDateDaysOff(page, limit, start_date, end_date);
        dispatch({ type: FETCH_SEARCH_PART_SUCCESS_DAYSOFF, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_DAYSOFF_FAILURE, payload: error.message });
    }
}

export const getPartSearchByEmployeeIdDaysOff = (page = 1, limit = 10, employee_id) => async (dispatch) => {
    dispatch({ type: FETCH_DAYSOFF });
    try {
        const response = await DayOffService.getPartSearchByEmployeeIdDaysOff(page, limit, employee_id);
        dispatch({ type: FETCH_SEARCH_PART_SUCCESS_DAYSOFF, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_DAYSOFF_FAILURE, payload: error.message });
    }
}

export const updateCurrentPageForDaysOff = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});