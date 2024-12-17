import React from 'react';
import Main_header from '../components/Main_Header/Main_Header';
import EmployeeCards from '../components/EmployeeCards/Employee_Cards';
import Footer from '../components/Footer/Footer';

const Manager = () => {
  return (
    <>
      <Main_header />
      <EmployeeCards/>
      <Footer/>
    </>
  );
};

export default Manager;