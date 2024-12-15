import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE,
} from '../../actionTypes';

const initialState = {
  documents: [],
  document: null,
  part_documents: [],
  originalDocuments: [],
  total: 0,
  currentPage: 1,
  totalPages: 0,
  limit: 10,
  sortBy: null,
  loading: false,
  error: null,
};

const documentSlice = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return { ...state, loading: true, error: null, document: null };

    // case FETCH_DOCUMENTS_SUCCESS:
    //   return handlePagination(state, action.payload, 'part_employees');
    
    case FETCH_DOCUMENTS_SUCCESS:
      return { ...state, loading: false, documents: action.payload, originalDocuments: [...action.payload], error: null };

    // case FETCH_EMPLOYEE_BY_ID_SUCCESS:
    //   return { ...state, employee: action.payload, loading: false, error: null };

    // case SET_CURRENT_PAGE:
    //   return { ...state, currentPage: action.payload };

    case FETCH_DOCUMENTS_FAILURE:
      return { ...state, loading: false, documents: [], error: action.payload, employee: null };

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

export default documentSlice;