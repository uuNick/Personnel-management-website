import React, { useState } from 'react';
//import './MainDocuments.css';
import { useNavigate, Link } from 'react-router-dom';
import Employee_Cards from '../EmployeeCards/Employee_Cards';
const MANAGERROLE = 'РУКОВОДИТЕЛЬ';
const INSPECTORROLE = 'ИНСПЕКТОР';


const MainDocuments = () => {

    return (
        <>
            <Employee_Cards type={'document'}></Employee_Cards>
        </>
    );
};

export default MainDocuments;