import React from 'react';
import Logo from '../../images/logo/logo.png';
import './Main_Header.css';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const MANAGERROLE = 'РУКОВОДИТЕЛЬ';
const INSPECTORROLE = 'ИНСПЕКТОР';


const Main_Header = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
            localStorage.removeItem('roleNames');
            navigate('/login');
        }
    }

    const userRole = localStorage.getItem('roleNames') || [];

    return (
        <header>
            <div className="header_wrapper ">
                <div className="logo_div">
                    <a href="#">
                        <img className="logo" src={Logo} alt='Logo' />
                    </a>
                    <span className="logo_name">
                        ОАО «ЗЕНИТ»
                    </span>
                </div>
                <div className="menu">
                    <nav className='body_menu'>
                        {userRole === INSPECTORROLE && (
                            <ul className="menu_list">
                                <li className='menu_item'>
                                    <Link to="/vacations" className="menu_link">Отпуска</Link>
                                </li>
                                <li className="menu_item">
                                    <Link to="/sickLeaves" className="menu_link">Больничные</Link>
                                </li>
                                <li className="menu_item">
                                    <Link to="/daysOff" className="menu_link">Прогулы</Link>
                                </li>
                            </ul>
                        )}
                        {userRole === MANAGERROLE && (
                            <ul className="menu_list">
                                <li className='menu_item'>
                                    <Link to="/documents" className="menu_link">Документы</Link>
                                </li>
                                <li className="menu_item">
                                    <Link to="/dataChanges" className="menu_link">Изменение данных</Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                    <div className="header_buttons">
                        <Button variant="outlined" color='primary.contrastText' onClick={handleClick}>Выйти</Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Main_Header;