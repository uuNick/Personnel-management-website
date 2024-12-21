import {
    FETCH_DATA_CHANGES,
    FETCH_PART_DATA_CHANGES_SUCCESS,
    FETCH_SORTED_PART_DATA_CHANGES_SUCCESS,
    SET_CURRENT_PAGE,
    FETCH_SEARCH_AND_SORT_DATA_CHANGES_SUCCESS,
    FETCH_SEARCH_PART_DATA_CHANGES_SUCCESS,
    FETCH_DATA_CHANGES_FAILURE,
} from '../../actionTypes';

const initialState = {
    data_changes: [],
    part_data_changes: [],
    common_part: [],
    total: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    sortBy: null,
    loading: false,
    error: null,
};

const dataChangeSlice = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_CHANGES:
            return { ...state, loading: true, error: null };

        case FETCH_PART_DATA_CHANGES_SUCCESS:
        case FETCH_SORTED_PART_DATA_CHANGES_SUCCESS:
        case FETCH_SEARCH_AND_SORT_DATA_CHANGES_SUCCESS:
        case FETCH_SEARCH_PART_DATA_CHANGES_SUCCESS:
            return handlePagination(state, action.payload, 'part_data_changes');

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };

        case FETCH_DATA_CHANGES_FAILURE:
            return { ...state, loading: false, data_changes: [], part_data_changes: [], common_part: [], error: action.payload };

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

export default dataChangeSlice;