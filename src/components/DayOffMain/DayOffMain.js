import React from 'react';
import { getPartDaysOff, getPartSortedDaysOff, updateCurrentPageForDaysOff, getPartSearchByDateAndSortDaysOff, getPartSearchByDateDaysOff } from '../../actions/dayOffActions';
import MainTables from '../MainTables/MainTables';

const DayOffMain = () => {
    return (
        <MainTables
            type={'dayOff'}
            getPartOfData={getPartDaysOff}
            getPartSortedData={getPartSortedDaysOff}
            updateCurrentPage={updateCurrentPageForDaysOff}
            getPartSearchByDateAndSortData={getPartSearchByDateAndSortDaysOff}
            getPartSearchByDateData={getPartSearchByDateDaysOff}
        />
    );
};

export default DayOffMain;