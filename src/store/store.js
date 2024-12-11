import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './slices/employeeSlice';

const store = configureStore({
    reducer: {
        employee: employeeSlice,
    },
});

export default store;
