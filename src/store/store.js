import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './slices/employeeSlice';
import sickLeaveSlice from './slices/sickLeaveSlice';
import documentSlice from './slices/documentSlice';
import vacationSlice from './slices/vacationSlice';

const store = configureStore({
    reducer: {
        employee: employeeSlice,
        sickLeave: sickLeaveSlice,
        documents: documentSlice,
        vacation: vacationSlice,
    },
});

export default store;
