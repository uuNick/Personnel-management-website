import {
  FETCH_EMPLOYEE,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_FAILURE,
  SET_SORT_BY,
} from '../../actionTypes';

const initialState = {
  loading: false,
  employees: [],
  originalEmployees: [],
  error: null,
  sortBy: null,
};

const employeeSlice = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE:
      return { ...state, loading: true, error: null };

    case FETCH_EMPLOYEE_SUCCESS:
      return { ...state, loading: false, employees: action.payload, originalEmployees: [...action.payload], error: null };

    case SET_SORT_BY:
      const { sortBy } = action.payload;
      let sortedEmployees = [...state.originalEmployees];
      if (sortBy === 'name') {
        sortedEmployees.sort((a, b) => a.fullname.toLowerCase().localeCompare(b.fullname.toLowerCase()));
      } else if (sortBy === 'start_date') {
        sortedEmployees.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
      } else if (sortBy === 'age') {
        sortedEmployees.sort((a, b) => new Date(a.birth_date) - new Date(b.birth_date));
      } else {
        sortedEmployees = [...state.originalEmployees];
      }
      return { ...state, employees: sortedEmployees, sortBy };

    case FETCH_EMPLOYEE_FAILURE:
      return { ...state, loading: false, employees: [], error: action.payload };

    default:
      return state;
  }
};

export default employeeSlice;