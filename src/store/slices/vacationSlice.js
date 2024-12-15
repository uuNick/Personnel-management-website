import {
    FETCH_VACATIONS,
    FETCH_PART_VACATIONS_SUCCESS,
    FETCH_SORTED_PART_VACATIONS_SUCCESS,
    //FETCH_VACATIONS_SUCCESS,
    FETCH_SEARCH_AND_SORT_SUCCESS_VACATIONS,
    FETCH_SEARCH_PART_SUCCESS_VACATIONS,
    FETCH_VACATIONS_FAILURE,
    SET_CURRENT_PAGE,
} from '../../actionTypes';

const initialState = {
    vacations: [],
    part_vacations: [],
    total: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    sortBy: null,
    loading: false,
    error: null,
};

const vacationSlice = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VACATIONS:
            return { ...state, loading: true, error: null };

        case FETCH_PART_VACATIONS_SUCCESS:
        case FETCH_SORTED_PART_VACATIONS_SUCCESS:
        case FETCH_SEARCH_AND_SORT_SUCCESS_VACATIONS:
        case FETCH_SEARCH_PART_SUCCESS_VACATIONS:
            return handlePagination(state, action.payload, 'part_vacations');

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };

        case FETCH_VACATIONS_FAILURE:
            return { ...state, loading: false, vacations: [], part_vacations: [], error: action.payload };

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

export default vacationSlice;