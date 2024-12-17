import {
    FETCH_DAYSOFF,
    FETCH_PART_DAYSOFF_SUCCESS,
    FETCH_SORTED_PART_DAYSOFF_SUCCESS,
    //FETCH_VACATIONS_SUCCESS,
    FETCH_SEARCH_AND_SORT_SUCCESS_DAYSOFF,
    FETCH_SEARCH_PART_SUCCESS_DAYSOFF,
    FETCH_DAYSOFF_FAILURE,
    SET_CURRENT_PAGE,
    FETCH_DAYSOFF_BY_ID_SUCCESS
} from '../../actionTypes';

const initialState = {
    daysOff: [],
    part_daysOff: [],
    common_part: [],
    total: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    sortBy: null,
    loading: false,
    error: null,
};

const dayOffSlice = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DAYSOFF:
            return { ...state, loading: true, error: null };

        case FETCH_PART_DAYSOFF_SUCCESS:
        case FETCH_SORTED_PART_DAYSOFF_SUCCESS:
        case FETCH_SEARCH_AND_SORT_SUCCESS_DAYSOFF:
        case FETCH_SEARCH_PART_SUCCESS_DAYSOFF:
        case FETCH_DAYSOFF_BY_ID_SUCCESS:
            return handlePagination(state, action.payload, 'part_daysOff');

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };

        case FETCH_DAYSOFF_FAILURE:
            return { ...state, loading: false, daysOff: [], part_daysOff: [], common_part: [], error: action.payload };

        default:
            return state;
    }
};

const handlePagination = (state, payload, dataKey) => ({
    ...state,
    [dataKey]: payload.data,
    common_part: payload.data,
    total: payload.total,
    currentPage: payload.currentPage,
    totalPages: Math.ceil(payload.total / state.limit),
    loading: false,
    error: null,
});

export default dayOffSlice;