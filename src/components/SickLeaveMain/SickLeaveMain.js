import React from 'react';
import { getPartSickLeaves, getPartSortedSickLeaves, updateCurrentPageForSickLeave, getPartSearchByDateAndSortSickLeaves, getPartSearchByDateSickLeaves } from '../../actions/sickLeaveAction';
import sickLeaveService from '../../services/sickLeaveService';
import MainTables from '../MainTables/MainTables';
import Footer from '../Footer/Footer';


const SickLeaveMain = () => {

    return (
        <>
            <MainTables type={'sickLeave'}
                getPartOfData={getPartSickLeaves}
                getPartSortedData={getPartSortedSickLeaves}
                updateCurrentPage={updateCurrentPageForSickLeave}
                getPartSearchByDateAndSortData={getPartSearchByDateAndSortSickLeaves}
                getPartSearchByDateData={getPartSearchByDateSickLeaves}
                getAllService={sickLeaveService.getAllSickLeaves}
                getPartSearchByDateDataService={sickLeaveService.getPartSearchByDateSickLeaves}
                getPartSearchByDateAndSortDataService={sickLeaveService.getPartSearchByDateAndSortSickLeaves}
                getPartSortedDataService={sickLeaveService.getPartSortedSickLeaves}
            />
            <Footer />
        </>
    );
};

export default SickLeaveMain;