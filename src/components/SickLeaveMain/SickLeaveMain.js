import React from 'react';
import { getPartSickLeaves, getPartSortedSickLeaves, updateCurrentPageForSickLeave, getPartSearchByDateAndSortSickLeaves, getPartSearchByDateSickLeaves } from '../../actions/sickLeaveAction';
import MainTables from '../MainTables/MainTables';



const SickLeaveMain = () => {

    return (
        <MainTables type={'sickLeave'} getPartOfData={getPartSickLeaves} getPartSortedData={getPartSortedSickLeaves} updateCurrentPage={updateCurrentPageForSickLeave} getPartSearchByDateAndSortData={getPartSearchByDateAndSortSickLeaves} getPartSearchByDateData={getPartSearchByDateSickLeaves}/>
    );
};

export default SickLeaveMain;