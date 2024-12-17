import React from 'react';
import { getPartVacations, getPartSortedVacations, updateCurrentPageForVacation, getPartSearchByDateAndSortVacations, getPartSearchByDateVacations } from '../../actions/vacationAction';
import MainTables from '../MainTables/MainTables';


const VacationMain = () => {
    return (
        <MainTables
            type={'vacation'}
            getPartOfData={getPartVacations}
            getPartSortedData={getPartSortedVacations}
            updateCurrentPage={updateCurrentPageForVacation}
            getPartSearchByDateAndSortData={getPartSearchByDateAndSortVacations}
            getPartSearchByDateData={getPartSearchByDateVacations}
        />
    );
};

export default VacationMain;