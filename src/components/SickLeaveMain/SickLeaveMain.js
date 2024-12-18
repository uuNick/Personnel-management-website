import React from 'react';
import { getPartSickLeaves, getPartSortedSickLeaves, updateCurrentPageForSickLeave, getPartSearchByDateAndSortSickLeaves, getPartSearchByDateSickLeaves } from '../../actions/sickLeaveAction';
import MainTables from '../MainTables/MainTables';
import Footer from '../Footer/Footer';


const SickLeaveMain = () => {

    return (
        <>
            <MainTables type={'sickLeave'} getPartOfData={getPartSickLeaves} getPartSortedData={getPartSortedSickLeaves} updateCurrentPage={updateCurrentPageForSickLeave} getPartSearchByDateAndSortData={getPartSearchByDateAndSortSickLeaves} getPartSearchByDateData={getPartSearchByDateSickLeaves} />
            <Footer />
        </>
    );
};

export default SickLeaveMain;