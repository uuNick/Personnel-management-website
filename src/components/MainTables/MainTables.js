import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { getAllEmployees } from '../../actions/employeeAction';
import { getAllDocuments } from '../../actions/documentAction';
//import { getPartOfData, getPartSortedData, updateCurrentPage, getPartSearchByDateAndSortData, getPartSearchByDateData } from '../../actions/sickLeaveAction';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TablePagination,
    TextField,
    Button
} from '@mui/material';
import hostServerJSON from "../../hostServer.json";
const hostServer = hostServerJSON.localhost_path;



const MainTables = ({ type, getPartOfData, getPartSortedData, getPartSearchByDateAndSortData, getPartSearchByDateData, updateCurrentPage }) => {

    const dispatch = useDispatch();
    const [sortBy, setSortBy] = useState(null);
    const { employees } = useSelector(state => state.employee);
    const { documents } = useSelector(state => state.documents);

    const { common_part, currentPage, totalPages, total, limit, loading, error } = useSelector(state => {
        if (type === 'vacation') {
            return state.vacation;
        } else if (type === 'sickLeave') {
            return state.sickLeave;
        } else {
            return state.dayOff;
        }
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
        setStartDateError(false);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
        setEndDateError(false);
    };

    const handleSubmit = () => {
        const startDateValid = dateRegex.test(startDate);
        const endDateValid = dateRegex.test(endDate);

        setStartDateError(!startDateValid);
        setEndDateError(!endDateValid);

        if (startDateValid && endDateValid) {
            if (sortBy) {
                dispatch(getPartSearchByDateAndSortData(currentPage, limit, startDate, endDate, sortBy));
            } else {
                dispatch(getPartSearchByDateData(currentPage, limit, startDate, endDate));
            }
        }
    };

    const handleReset = () => {
        setStartDate('');
        setStartDateError(false);
        setEndDate('');
        setEndDateError(false);

        if (sortBy) {
            dispatch(getPartSortedData(currentPage, limit, sortBy));
        }
        else {
            dispatch(getPartOfData(currentPage, limit));
        }

    }

    useEffect(() => {
        if (startDate !== '' && endDate !== '') {
            if (sortBy) {
                dispatch(getPartSearchByDateAndSortData(currentPage, limit, startDate, endDate, sortBy));
            } else {
                dispatch(getPartSearchByDateData(currentPage, limit, startDate, endDate));
            }
        } else {
            if (sortBy) {
                dispatch(getPartSortedData(currentPage, limit, sortBy));
            } else {
                dispatch(getPartOfData(currentPage, limit));
            }
        }
        if (employees.length === 0 && documents.length === 0) {
            dispatch(getAllEmployees());
            dispatch(getAllDocuments());
        }
    }, [dispatch, currentPage, limit, sortBy]);

    const handleSort = (columnName) => {
        const hasDates = startDate !== '' && endDate !== '';

        if (hasDates) {
            const newSortBy = sortBy === columnName ? null : columnName;
            setSortBy(newSortBy);
            dispatch(newSortBy
                ? getPartSearchByDateAndSortData(currentPage, limit, startDate, endDate, newSortBy)
                : getPartSearchByDateData(currentPage, limit, startDate, endDate)
            );
        } else {
            const newSortBy = sortBy === columnName ? null : columnName;
            setSortBy(newSortBy);
            dispatch(newSortBy
                ? getPartSortedData(currentPage, limit, newSortBy)
                : getPartOfData(currentPage, limit)
            );
        }
    }

    const handleChangePage = (event, newPage) => {
        dispatch(updateCurrentPage(newPage + 1));
        if (sortBy) {
            dispatch(getPartSortedData(newPage + 1, limit, sortBy));
        }
        else {
            dispatch(getPartOfData(newPage + 1, limit));
        }
    };

    const employeeMap = employees.reduce((map, employee) => {
        map[employee.id] = employee.fullname;
        return map;
    }, {});

    let documentMap = {};
    if (type !== 'dayOff') {
        documentMap = documents.reduce((map, document) => {
            map[document.id] = document.imageUrl;
            return map;
        }, {});
    }

    //if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                alignItems: "center",
                margin: "20px auto",
                maxWidth: 1000

            }}>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <TextField
                            id="start-date"
                            label="Начало"
                            type="text"
                            color="primary.main"
                            value={startDate}
                            onChange={handleStartDateChange}
                            error={startDateError}
                            helperText={startDateError ? 'Формат даты YYYY-MM-DD' : ''}
                        />

                        <TextField
                            id="end-date"
                            label="Конец"
                            type="text"
                            color="primary.main"
                            value={endDate}
                            onChange={handleEndDateChange}
                            error={endDateError}
                            helperText={endDateError ? 'Формат даты YYYY-MM-DD' : ''}
                        />
                        <Box sx={{ display: "flex", gap: "10px" }}>
                            <Button color='primary.contrastText' onClick={handleSubmit}>
                                Найти
                            </Button>
                            <Button color='primary.contrastText' onClick={handleReset}>
                                Сбросить
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{
                            minWidth: 650
                        }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>ФИО</TableCell>
                                    {['vacation', 'sickLeave'].includes(type) && (
                                        <TableCell key={'document_id'} align="center" onClick={() => handleSort('document_id')} sx={{ cursor: 'pointer' }}>
                                            Документ ID
                                        </TableCell>
                                    )}
                                    <TableCell key={'start_date'} align="center" onClick={() => handleSort('start_date')} sx={{ cursor: 'pointer' }} >Начало</TableCell>
                                    <TableCell key={'end_date'} align="center" onClick={() => handleSort('end_date')} sx={{ cursor: 'pointer' }} >Конец</TableCell>
                                    <TableCell align="center">{
                                        (() => {
                                            if (type === 'vacation') return 'Тип отпуска';
                                            if (type === 'sickLeave') return 'Диагноз';
                                            return 'Причина';
                                        })()
                                    }</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {common_part.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" align='center' scope="row">
                                            {employeeMap[item.employee_id] || 'Неизвестно'}
                                        </TableCell>
                                        {['vacation', 'sickLeave'].includes(type) && (
                                            <TableCell align="center" sx={{ cursor: 'pointer' }}>
                                                <Link to={`${hostServer}${documentMap[item.document_id]}`} target="_blank">
                                                    {item.document_id}
                                                </Link>
                                            </TableCell>
                                        )}
                                        <TableCell align="center">{item.start_date}</TableCell>
                                        <TableCell align="center">{item.end_date}</TableCell>
                                        <TableCell align="center">
                                            {(() => {
                                                if (type === 'vacation') return item.type || 'нет данных';
                                                if (type === 'sickLeave') return item.diagnosis || 'нет данных';
                                                return item.reason || 'нет данных';
                                            })()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination sx={{ display: 'flex', justifyContent: 'center' }}
                        rowsPerPageOptions={[limit]}
                        component="div"
                        count={total}
                        rowsPerPage={limit}
                        page={currentPage - 1}
                        onPageChange={handleChangePage}
                    />
                </Box>

            </Box>
        </>
    );
};

export default MainTables;