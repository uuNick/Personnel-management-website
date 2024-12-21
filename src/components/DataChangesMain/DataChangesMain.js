import React from 'react';
import { getPartDataChanges, getPartSortedDataChanges, updateCurrentPageForDataChanges, getPartSearchByDateAndSortDataChanges, getPartSearchByDateDataChanges } from '../../actions/dataChangeAction';
import dataChangeService from '../../services/dataChangeService';
import MainTables from '../MainTables/MainTables';
import Footer from '../Footer/Footer';

const DayOffMain = () => {
    return (
        <>
            <MainTables
                type={'dataChange'}
                getPartOfData={getPartDataChanges}
                getPartSortedData={getPartSortedDataChanges}
                updateCurrentPage={updateCurrentPageForDataChanges}
                getPartSearchByDateAndSortData={getPartSearchByDateAndSortDataChanges}
                getPartSearchByDateData={getPartSearchByDateDataChanges}
                getAllService={dataChangeService.getAllDataChanges}
                getPartSearchByDateDataService={dataChangeService.getPartSearchByDateDataChanges}
                getPartSearchByDateAndSortDataService={dataChangeService.getPartSearchByDateAndSortDataChanges}
                getPartSortedDataService={dataChangeService.getPartSortedDataChanges}
            />
            <Footer />
        </>
    );
};

export default DayOffMain;