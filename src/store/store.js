import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './slices/employeeSlice';
import sickLeaveSlice from './slices/sickLeaveSlice';

const store = configureStore({
    reducer: {
        employee: employeeSlice,
        sickLeave: sickLeaveSlice,
    },
});

export default store;
