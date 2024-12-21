import {
    FETCH_DATA_CHANGES,
    FETCH_PART_DATA_CHANGES_SUCCESS,
    FETCH_SORTED_PART_DATA_CHANGES_SUCCESS,
    SET_CURRENT_PAGE,
    FETCH_SEARCH_AND_SORT_DATA_CHANGES_SUCCESS,
    FETCH_SEARCH_PART_DATA_CHANGES_SUCCESS,
    FETCH_DATA_CHANGES_FAILURE,
} from '../actionTypes';
import DataChangeService from "../services/dataChangeService";



export const getPartDataChanges = (page = 1, limit = 10) => async (dispatch) => {
    dispatch({ type: FETCH_DATA_CHANGES });
    try {
        const response = await DataChangeService.getPartDataChanges(page, limit);
        dispatch({ type: FETCH_PART_DATA_CHANGES_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_DATA_CHANGES_FAILURE, payload: error.message });
    }
};

export const getPartSortedDataChanges = (page = 1, limit = 10, sortBy = "date_of_change", order = "ASC") => async (dispatch) => {
    dispatch({ type: FETCH_DATA_CHANGES });
    try {
        const response = await DataChangeService.getPartSortedDataChanges(page, limit, sortBy, order);
        dispatch({ type: FETCH_SORTED_PART_DATA_CHANGES_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_DATA_CHANGES_FAILURE, payload: error.message });
    }
};

export const getPartSearchByDateAndSortDataChanges = (page = 1, limit = 10, start_date, end_date, sortBy = "date_of_change", order = "ASC") => async (dispatch) => {
    dispatch({ type: FETCH_DATA_CHANGES });
    try {
        const response = await DataChangeService.getPartSearchByDateAndSortDataChanges(page, limit, start_date, end_date, sortBy, order);
        dispatch({ type: FETCH_SEARCH_AND_SORT_DATA_CHANGES_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_DATA_CHANGES_FAILURE, payload: error.message });
    }
}

export const getPartSearchByDateDataChanges = (page = 1, limit = 10, start_date, end_date) => async (dispatch) => {
    dispatch({ type: FETCH_DATA_CHANGES });
    try {
        const response = await DataChangeService.getPartSearchByDateDataChanges(page, limit, start_date, end_date);
        dispatch({ type: FETCH_SEARCH_PART_DATA_CHANGES_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
    } catch (error) {
        dispatch({ type: FETCH_DATA_CHANGES_FAILURE, payload: error.message });
    }
}

export const updateCurrentPageForDataChanges = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});