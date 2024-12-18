import React from 'react';
import { getPartDaysOff, getPartSortedDaysOff, updateCurrentPageForDaysOff, getPartSearchByDateAndSortDaysOff, getPartSearchByDateDaysOff } from '../../actions/dayOffActions';
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
            />
            <Footer/>
        </>
    );
};

export default DayOffMain;