import {
  FETCH_EMPLOYEE,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_PART_EMPLOYEE_SUCCESS,
  FETCH_PART_SEARCH_AND_SORT_EMPLOYEE_SUCCESS,
  FETCH_PART_SORT_EMPLOYEE_SUCCESS,
  FETCH_PART_SEARCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_FAILURE,
  SET_SORT_BY,
  SET_CURRENT_PAGE
} from '../actionTypes';
import EmployeeService from "../services/employeeService";

export const getAllEmployees = () => async (dispatch) => {
  dispatch({ type: FETCH_EMPLOYEE });
  try {
    const employees = await EmployeeService.getAllEmployees();
    dispatch({ type: FETCH_EMPLOYEE_SUCCESS, payload: employees });
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYEE_FAILURE, payload: error });
  }
};

export const getPartEmployess = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_EMPLOYEE });
  try {
    const response = await EmployeeService.getPartEmployees(page, limit);
    dispatch({ type: FETCH_PART_EMPLOYEE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYEE_FAILURE, payload: error.message });
  }
};

export const getPartFindAndSortEmployess = (page = 1, limit = 10, search, sortBy = "fullname", order = "ASC") => async (dispatch) => {
  dispatch({ type: FETCH_EMPLOYEE });
  try {
    const response = await EmployeeService.getPartFindAndSortEmployees(page, limit, search, sortBy, order);
    dispatch({ type: FETCH_PART_SEARCH_AND_SORT_EMPLOYEE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYEE_FAILURE, payload: error.message });
  }
};

export const getPartFindEmployee = (page = 1, limit = 10, search) => async (dispatch) => {
  dispatch({ type: FETCH_EMPLOYEE });
  try {
    const response = await EmployeeService.getPartFindEmployee(page, limit, search);
    dispatch({ type: FETCH_PART_SEARCH_EMPLOYEE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYEE_FAILURE, payload: error.message });
  }
};

export const getPartSortedEmployees = (page = 1, limit = 10, sortBy = "fullname", order = "ASC") => async (dispatch) => {
  dispatch({ type: FETCH_EMPLOYEE });
  try {
    const response = await EmployeeService.getPartSortEmployee(page, limit, sortBy, order);
    dispatch({ type: FETCH_PART_SORT_EMPLOYEE_SUCCESS, payload: { ...response.data, currentPage: page, limit } });
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYEE_FAILURE, payload: error.message });
  }
};


export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  payload: { sortBy },
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
