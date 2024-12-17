import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById } from '../../actions/employeeAction';
import { useSelector, useDispatch } from 'react-redux';
import TableForEmployee from "../TableForEmployee/TableForEmployee";
import { getPartSearchByEmployeeIdSickLeaves } from '../../actions/sickLeaveAction';
import { getPartSearchByEmployeeIdVacations } from '../../actions/vacationAction';
import { getPartSearchByEmployeeIdDaysOff } from '../../actions/dayOffActions';
import {
    Box,
    Typography,
    Button,
    CardMedia,
    CircularProgress
} from '@mui/material';
import noPhoto2 from "../../images/no_photo_2.png";
import hostServerJSON from "../../hostServer.json";
const hostServer = hostServerJSON.localhost_path;

const DetailedInfo = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const { employee, loading, error } = useSelector(state => state.employee);

    useEffect(() => {
        dispatch(getEmployeeById(id));
    }, [dispatch]);

    const navigate = useNavigate()

    const goBack = () => {
        navigate("/manager");
    }

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>; // Индикатор загрузки
    }

    if (error) {
        return <Typography variant="h6" color="error">Ошибка: {error}</Typography>; // Сообщение об ошибке
    }

    if (!employee) {
        return <Typography variant="h6">Работник не найден</Typography>; // Сообщение об отсутствии работника
    }

    return (
        <>
            <Box sx={{
                maxWidth: "700px",
                maxHeight: "400px",
                // backgroundColor: "gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "30px auto",
                gap: "30px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
            }}>
                <Box sx={{
                    //boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
                }}>
                    <CardMedia
                        component="img"
                        height="250px"
                        image={employee.imageUrl ? `${hostServer}${employee.imageUrl}` : noPhoto2}
                        alt="text"
                        sx={{
                            //objectFit: 'contain',
                            margin: "20px auto",
                        }}
                    />
                </Box>
                <Box sx={{
                    //boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
                }}>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        ФИО: {employee.fullname}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        Дата рождения: {employee.birth_date}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        Должность: {employee.position}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        Дата трудоустройства: {employee.start_date}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        Телефон: {employee.phone_number}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        Email: {employee.email || 'отсутствует'}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        Адрес проживания: {employee.address}
                    </Typography>
                </Box>
            </Box >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                flexWrap: 'wrap',
            }}>
                <Box sx = {{
                    textAlign: 'center',
                    maxWidth: '700px',
                    marginBottom: "40px"
                }}>
                    <Typography variant='h4' sx={{marginBottom: '20px'}}>Отпуска</Typography>
                    <TableForEmployee type={'vacation'} employee_id={employee.id} getPartSearch={getPartSearchByEmployeeIdVacations} />
                </Box>
                <Box sx = {{
                    textAlign: 'center',
                    maxWidth: '700px',
                    marginBottom: "40px"
                }}>
                    <Typography variant='h4' sx={{textAlign:'center', marginBottom: '20px'}}>Больничные</Typography>
                    <TableForEmployee type={'sickLeave'} employee_id={employee.id} getPartSearch={getPartSearchByEmployeeIdSickLeaves} />
                </Box>
                <Box sx = {{
                    textAlign: 'center',
                    maxWidth: '700px',
                    marginBottom: "40px"
                }}>
                    <Typography variant='h4' sx={{textAlign:'center', marginBottom: '20px'}}>Прогулы</Typography>
                    <TableForEmployee type={'dayOff'} employee_id={employee.id} getPartSearch={getPartSearchByEmployeeIdDaysOff} />
                </Box>

            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",

            }}>
                <Button size="small" color='primary.contrastText' sx={{ fontSize: '14px' }} onClick={() => goBack()}>Назад</Button>
            </Box>
        </>
    );
};

export default DetailedInfo;