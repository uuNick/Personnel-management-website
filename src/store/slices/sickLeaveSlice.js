import {
    FETCH_SICKLEAVES,
    FETCH_PART_SICKLEAVES_SUCCESS,
    FETCH_SORTED_PART_SICKLEAVES_SUCCESS,
    FETCH_SICKLEAVES_FAILURE,
    SET_CURRENT_PAGE,
    FETCH_SEARCH_AND_SORT_SUCCESS,
    FETCH_SEARCH_PART_SUCCESS
} from '../../actionTypes';

const initialState = {
    sickLeaves: [],
    part_sickLeaves: [],
    total: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    sortBy: null,
    loading: false,
    error: null,
};

const sickLeaveSlice = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SICKLEAVES:
            return { ...state, loading: true, error: null };

        case FETCH_PART_SICKLEAVES_SUCCESS:
        case FETCH_SORTED_PART_SICKLEAVES_SUCCESS:
        case FETCH_SEARCH_AND_SORT_SUCCESS:
        case FETCH_SEARCH_PART_SUCCESS:
            return handlePagination(state, action.payload, 'part_sickLeaves');

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };

        case FETCH_SICKLEAVES_FAILURE:
            return { ...state, loading: false, sickLeaves: [], part_sickLeaves: [], error: action.payload };

        default:
            return state;
    }
};

const handlePagination = (state, payload, dataKey) => ({
    ...state,
    [dataKey]: payload.data,
    total: payload.total,
    currentPage: payload.currentPage,
    totalPages: Math.ceil(payload.total / state.limit),
    loading: false,
    error: null,
});

export default sickLeaveSlice;