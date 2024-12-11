import {
  FETCH_EMPLOYEE,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_PART_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_FAILURE,
  SET_SORT_BY
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


export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  payload: { sortBy },
});

