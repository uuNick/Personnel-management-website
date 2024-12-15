import {
  FETCH_SICKLEAVES,
  FETCH_PART_SICKLEAVES_SUCCESS,
  FETCH_SORTED_PART_SICKLEAVES_SUCCESS,
  FETCH_SICKLEAVES_FAILURE,
  SET_CURRENT_PAGE,
  FETCH_SEARCH_AND_SORT_SUCCESS,
  FETCH_SEARCH_PART_SUCCESS,
  FETCH_SICKLEVAES_BY_ID_SUCCESS
} from '../actionTypes';
import SickLeaveService from "../services/sickLeaveService";


export const getPartSickLeaves = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_SICKLEAVES });
  try {
    const response = await SickLeaveService.getPartSickLeaves(page, limit);
    dispatch({ type: FETCH_PART_SICKLEAVES_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_SICKLEAVES_FAILURE, payload: error.message });
  }
};

export const getPartSortedSickLeaves = (page = 1, limit = 10, sortBy = "start_date", order = "ASC") => async (dispatch) => {
  dispatch({ type: FETCH_SICKLEAVES });
  try {
    const response = await SickLeaveService.getPartSortedSickLeaves(page, limit, sortBy, order);
    dispatch({ type: FETCH_SORTED_PART_SICKLEAVES_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_SICKLEAVES_FAILURE, payload: error.message });
  }
};

export const getPartSearchByDateAndSortSickLeaves = (page = 1, limit = 10, start_date, end_date, sortBy, order = "ASC") => async (dispatch) => {
  dispatch({ type: FETCH_SICKLEAVES });
  try {
    const response = await SickLeaveService.getPartSearchByDateAndSortSickLeaves(page, limit, start_date, end_date, sortBy, order);
    dispatch({ type: FETCH_SEARCH_AND_SORT_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_SICKLEAVES_FAILURE, payload: error.message });
  }
}

export const getPartSearchByDateSickLeaves = (page = 1, limit = 10, start_date, end_date) => async (dispatch) => {
  dispatch({ type: FETCH_SICKLEAVES });
  try {
    const response = await SickLeaveService.getPartSearchByDateSickLeaves(page, limit, start_date, end_date);
    dispatch({ type: FETCH_SEARCH_PART_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_SICKLEAVES_FAILURE, payload: error.message });
  }
}

export const getPartSearchByEmployeeIdSickLeaves = (page = 1, limit = 10, employee_id) => async (dispatch) => {
  dispatch({ type: FETCH_SICKLEAVES });
  try {
    const response = await SickLeaveService.getPartSearchByEmployeeIdSickLeaves(page, limit, employee_id);
    dispatch({ type: FETCH_SICKLEVAES_BY_ID_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_SICKLEAVES_FAILURE, payload: error.message });
  }
}

export const updateCurrentPageForSickLeave = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});