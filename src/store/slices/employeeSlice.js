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
} from '../../actionTypes';

const initialState = {
  employees: [],
  part_employees: [],
  originalEmployees: [],
  total: 0,
  currentPage: 1,
  totalPages: 0,
  limit: 10,
  sortBy: null,
  loading: false,
  error: null,
};

const employeeSlice = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE:
      return { ...state, loading: true, error: null };

    case FETCH_PART_EMPLOYEE_SUCCESS:
    case FETCH_PART_SEARCH_AND_SORT_EMPLOYEE_SUCCESS:
    case FETCH_PART_SEARCH_EMPLOYEE_SUCCESS:
    case FETCH_PART_SORT_EMPLOYEE_SUCCESS:
      return handlePagination(state, action.payload, 'part_employees');

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

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    case FETCH_EMPLOYEE_FAILURE:
      return { ...state, loading: false, employees: [], error: action.payload };

    default:
      return state;
  }
};

const handlePagination = (state, payload, dataKey) => ({
  ...state,
  [dataKey]: payload.data,
  total: payload.total,
  currentPage: payload.currentPage,
  totalPages: payload.pages,
  loading: false,
  error: null,
});

export default employeeSlice;