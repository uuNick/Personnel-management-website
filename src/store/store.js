import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './slices/employeeSlice';
import sickLeaveSlice from './slices/sickLeaveSlice';
import documentSlice from './slices/documentSlice';
import vacationSlice from './slices/vacationSlice';
import dayOffSlice from './slices/dayOffSlice';

const store = configureStore({
    reducer: {
        employee: employeeSlice,
        sickLeave: sickLeaveSlice,
        documents: documentSlice,
        vacation: vacationSlice,
        dayOff: dayOffSlice,
    },
});

export default store;
