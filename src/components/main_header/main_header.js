import React from 'react';
import Logo from '../../images/logo/logo.png';
import './Main_Header.css';
import Button from '@mui/material/Button';

const Main_Header = () => {


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
                        <ul className="menu_list">
                            <li className='menu_item'>
                                <a href="#" className="menu_link">Отдел кадров</a>
                            </li>
                            <li className="menu_item">
                                <a href="#" className="menu_link">Руководитель предприятия</a>
                            </li>
                        </ul>
                    </nav>
                    {/* <div className="header_buttons">
                        <Button variant="outlined" color='primary.contrastText'>Войти</Button>
                    </div> */}
                </div>
            </div>
        </header>
    );
};

export default Main_Header;