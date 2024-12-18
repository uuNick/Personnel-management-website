import React from 'react';
import { getPartDaysOff, getPartSortedDaysOff, updateCurrentPageForDaysOff, getPartSearchByDateAndSortDaysOff, getPartSearchByDateDaysOff } from '../../actions/dayOffActions';
import dayOffService from '../../services/dayOffService';
import MainTables from '../MainTables/MainTables';
import Footer from '../Footer/Footer';

const DayOffMain = () => {
    return (
        <>
            <MainTables
                type={'dayOff'}
                getPartOfData={getPartDaysOff}
                getPartSortedData={getPartSortedDaysOff}
                updateCurrentPage={updateCurrentPageForDaysOff}
                getPartSearchByDateAndSortData={getPartSearchByDateAndSortDaysOff}
                getPartSearchByDateData={getPartSearchByDateDaysOff}
                getAllService={dayOffService.getAllDaysOff}
                getPartSearchByDateDataService={dayOffService.getPartSearchByDateDaysOff}
                getPartSearchByDateAndSortDataService={dayOffService.getPartSearchByDateAndSortDaysOff}
                getPartSortedDataService={dayOffService.getPartSortedDaysOff}
            />
            <Footer />
        </>
    );
};

export default DayOffMain;