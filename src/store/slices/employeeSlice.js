import {
    FETCH_EMPLOYEE,
    FETCH_EMPLOYEE_SUCCESS,
    FETCH_EMPLOYEE_FAILURE,
  } from '../../actionTypes';
  
  const initialState = {
    loading: false,
    employees: [],
    error: null,
  };
  
  const employeeSlice = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EMPLOYEE:
        return { ...state, loading: true, error: null };
      case FETCH_EMPLOYEE_SUCCESS:
        return { ...state, loading: false, employees: action.payload, error: null };
      case FETCH_EMPLOYEE_FAILURE:
        return { ...state, loading: false, employees: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default employeeSlice;