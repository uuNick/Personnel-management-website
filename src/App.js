import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound404 from "./pages/NotFound404";
import Login from "./pages/Authorization/Login";
import Registration from "./pages/Authorization/Registration";
import ResetPage from "./pages/Authorization/ResetPage";
import ResetPassword from "./pages/Authorization/ResetPassword";
import AddEmployee from "./pages/AddEmployee";
import RedactEmployee from "./pages/RedactEmployee";
import DetailedEmployeeInfo from "./pages/DetailedEmployeeInfo";
import SickLeaves from "./pages/SickLeaves";
import Vacations from "./pages/Vacations";
import DaysOff from "./pages/DaysOff";
import AddInformation from "./pages/AddInformation";
import Documents from "./pages/Documents";
import PersonnelDepartment from "./pages/PersonnelDepartment";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/editEmployee/:id" element={<RedactEmployee />} />
          <Route path="/detailedInfo/:id" element={<DetailedEmployeeInfo/>}/>
          <Route path="/sickLeaves" element={<SickLeaves />} />
          <Route path="/vacations" element={<Vacations />} />
          <Route path="/addInf/:type/:id" element={<AddInformation />} />
          <Route path="/daysOff" element={<DaysOff />} />
          <Route path="/personnelDepartment" element={<PersonnelDepartment/>}/>
          <Route path="/documents" element={<Documents/>}/>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
