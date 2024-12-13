import {
  FETCH_SICKLEAVES,
  FETCH_PART_SICKLEAVES_SUCCESS,
  FETCH_SORTED_PART_SICKLEAVES_SUCCESS,
  FETCH_SICKLEAVES_FAILURE,
  SET_CURRENT_PAGE,
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

export const updateCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});