import React, { useState } from 'react';
import Logo from '../../images/logo/logo.png';
import './Main_Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Menu, MenuItem } from '@mui/material';
const MANAGERROLE = 'РУКОВОДИТЕЛЬ';
const INSPECTORROLE = 'ИНСПЕКТОР';


const Main_Header = () => {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    // const handleClick = () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('roleNames');
    //         navigate('/login');
    //     }
    // }

    const userRole = localStorage.getItem('roleNames') || [];

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleModalConfirm = () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
            localStorage.removeItem('roleNames');
            navigate('/login');
        }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                                <li className="menu_item">
                                    <Link to="/registration" className="menu_link">Зарегистрировать</Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                    <div className="header_buttons">
                        <Button variant="outlined" color='primary.contrastText' onClick={handleModalOpen}>Выйти</Button>
                    </div>
                </div>
                <div className='hidden_menu'>
                    <Button
                        onClick={handleClick}
                        variant='outlined'
                        color='primary.contrastText'
                        sx={{
                            border: 'none',
                            padding: '0'
                        }}
                    >
                        Ссылки
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {userRole === MANAGERROLE && [
                            <MenuItem key="documents"><Link to="/documents" className="menu_link">Документы</Link></MenuItem>,
                            <MenuItem key="dataChanges"><Link to="/dataChanges" className="menu_link">Изменение данных</Link></MenuItem>,
                            <MenuItem key="registration"><Link to="/registration" className="menu_link">Зарегистрировать</Link></MenuItem>,
                            <MenuItem key="log_out" onClick={handleModalOpen}>Выйти</MenuItem>,
                        ]}
                        {userRole === INSPECTORROLE && [
                            <MenuItem key="vacations"><Link to="/vacations" className="menu_link">Отпуска</Link></MenuItem>,
                            <MenuItem key="sickLeaves"><Link to="/sickLeaves" className="menu_link">Больничные</Link></MenuItem>,
                            <MenuItem key="daysOff"><Link to="/daysOff" className="menu_link">Прогулы</Link></MenuItem>,
                            <MenuItem key="log_out" onClick={handleModalOpen}>Выйти</MenuItem>,
                        ]}
                    </Menu>
                </div>
            </div>
            <Dialog open={open} onClose={handleModalClose}>
                <DialogTitle>Подтверждение выхода</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы уверены, что хотите выйти из аккаунта?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalConfirm} color="primary.contrastText">Выйти</Button>
                    <Button onClick={handleModalClose} color='primary.contrastText'>Отмена</Button>
                </DialogActions>
            </Dialog>
        </header>
    );
};

export default Main_Header;