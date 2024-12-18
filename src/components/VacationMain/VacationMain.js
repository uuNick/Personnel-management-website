import React from 'react';
import { getPartVacations, getPartSortedVacations, updateCurrentPageForVacation, getPartSearchByDateAndSortVacations, getPartSearchByDateVacations } from '../../actions/vacationAction';
import vacationService from '../../services/vacationsService'
import MainTables from '../MainTables/MainTables';
import Footer from '../Footer/Footer';

const VacationMain = () => {
    return (
        <>
            <MainTables
                type={'vacation'}
                getPartOfData={getPartVacations}
                getPartSortedData={getPartSortedVacations}
                updateCurrentPage={updateCurrentPageForVacation}
                getPartSearchByDateAndSortData={getPartSearchByDateAndSortVacations}
                getPartSearchByDateData={getPartSearchByDateVacations}
                getAllService={vacationService.getAllVacations}
                getPartSearchByDateDataService={vacationService.getPartSearchByDateVacations}
                getPartSearchByDateAndSortDataService={vacationService.getPartSearchByDateAndSortVacations}
                getPartSortedDataService={vacationService.getPartSortedVacations}
            />
            <Footer />
        </>
    );
};

export default VacationMain;