import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { getAllEmployees } from '../../actions/employeeAction';
import { getAllDocuments } from '../../actions/documentAction';
import { getPartVacations, getPartSortedVacations, updateCurrentPageForVacation, getPartSearchByDateAndSortVacations, getPartSearchByDateVacations } from '../../actions/vacationAction';
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


const VacationMain = () => {

    const dispatch = useDispatch();
    const [sortBy, setSortBy] = useState(null);
    const { employees } = useSelector(state => state.employee);
    const { documents } = useSelector(state => state.documents);
    const { part_vacations, currentPage, totalPages, total, limit, loading, error } = useSelector(state => state.vacation);
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
                dispatch(getPartSearchByDateAndSortVacations(currentPage, limit, startDate, endDate, sortBy));
            } else {
                dispatch(getPartSearchByDateVacations(currentPage, limit, startDate, endDate));
            }
        }
    };

    const handleReset = () => {
        setStartDate('');
        setStartDateError(false);
        setEndDate('');
        setEndDateError(false);

        if (sortBy) {
            dispatch(getPartSortedVacations(currentPage, limit, sortBy));
        }
        else {
            dispatch(getPartVacations(currentPage, limit));
        }

    }

    useEffect(() => {
        if (startDate !== '' && endDate !== '') {
            if (sortBy) {
                dispatch(getPartSearchByDateAndSortVacations(currentPage, limit, startDate, endDate, sortBy));
            } else {
                dispatch(getPartSearchByDateVacations(currentPage, limit, startDate, endDate));
            }
        } else {
            if (sortBy) {
                dispatch(getPartSortedVacations(currentPage, limit, sortBy));
            } else {
                dispatch(getPartVacations(currentPage, limit));
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
                ? getPartSearchByDateAndSortVacations(currentPage, limit, startDate, endDate, newSortBy)
                : getPartSearchByDateVacations(currentPage, limit, startDate, endDate)
            );
        } else {
            const newSortBy = sortBy === columnName ? null : columnName;
            setSortBy(newSortBy);
            dispatch(newSortBy
                ? getPartSortedVacations(currentPage, limit, newSortBy)
                : getPartVacations(currentPage, limit)
            );
        }
    }

    const handleChangePage = (event, newPage) => {
        dispatch(updateCurrentPageForVacation(newPage + 1));
        if (sortBy) {
            console.log(`вызов сортировки ${sortBy}`);
            dispatch(getPartSortedVacations(newPage + 1, limit, sortBy));
        }
        else {
            console.log("вызов обычный");
            dispatch(getPartVacations(newPage + 1, limit));
        }
    };

    const employeeMap = employees.reduce((map, employee) => {
        map[employee.id] = employee.fullname;
        return map;
    }, {});

    const documentMap = documents.reduce((map, document) => {
        map[document.id] = document.imageUrl; // Используем imageUrl
        return map;
    }, {});

    if (loading) return <p>Загрузка...</p>;
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
                                    <TableCell key={'document_id'} align="center" onClick={() => handleSort('document_id')} sx={{ cursor: 'pointer' }} >Документ ID</TableCell>
                                    <TableCell key={'start_date'} align="center" onClick={() => handleSort('start_date')} sx={{ cursor: 'pointer' }} >Начало</TableCell>
                                    <TableCell key={'end_date'} align="center" onClick={() => handleSort('end_date')} sx={{ cursor: 'pointer' }} >Конец</TableCell>
                                    <TableCell align="center">Тип отпуска</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {part_vacations.map((vacation) => (
                                    <TableRow
                                        key={vacation.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" align='center' scope="row">
                                            {employeeMap[vacation.employee_id] || 'Неизвестно'}
                                        </TableCell>
                                        <TableCell align="center" sx={{ cursor: 'pointer' }}> <Link to = {`http://localhost:7001${documentMap[vacation.document_id]}`}  target="_blank"> {vacation.document_id} </Link></TableCell>
                                        <TableCell align="center">{vacation.start_date}</TableCell>
                                        <TableCell align="center">{vacation.end_date}</TableCell>
                                        <TableCell align="center">{vacation.type || 'нет данных'}</TableCell>
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

export default VacationMain;