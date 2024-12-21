import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './slices/employeeSlice';
import sickLeaveSlice from './slices/sickLeaveSlice';
import documentSlice from './slices/documentSlice';
import vacationSlice from './slices/vacationSlice';
import dayOffSlice from './slices/dayOffSlice';
import dataChangeSlice from './slices/dataChangeSlice';

const store = configureStore({
    reducer: {
        employee: employeeSlice,
        sickLeave: sickLeaveSlice,
        documents: documentSlice,
        vacation: vacationSlice,
        dayOff: dayOffSlice,
        dataChange: dataChangeSlice,
    },
});

export default store;
