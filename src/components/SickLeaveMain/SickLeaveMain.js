import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEmployees } from '../../actions/employeeAction';
import { getPartSickLeaves, getPartSortedSickLeaves, updateCurrentPage } from '../../actions/sickLeaveAction';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TablePagination
} from '@mui/material';


const SickLeaveMain = () => {

    const dispatch = useDispatch();
    const [sortBy, setSortBy] = useState(null);
    const { employees } = useSelector(state => state.employee);
    const { part_sickLeaves, currentPage, totalPages, limit, loading, error } = useSelector(state => state.sickLeave);

    useEffect(() => {
        if (sortBy) {
            dispatch(getPartSortedSickLeaves(currentPage, limit, sortBy));
        } else {
            dispatch(getPartSickLeaves(currentPage, limit));
        }
        if (employees.length == 0) {
            dispatch(getAllEmployees());
        }
    }, [dispatch, currentPage, limit, sortBy]);

    const handleSort = (columnName) => {
        if (sortBy == columnName) {
            setSortBy(null);
            dispatch(getPartSickLeaves(currentPage, limit));
        }
        else {
            setSortBy(columnName);
            dispatch(getPartSortedSickLeaves(currentPage, limit, columnName));
        }
    }

    const handleChangePage = (event, newPage) => {
        dispatch(updateCurrentPage(newPage + 1));
        if (sortBy) {
            console.log(`вызов сортировки ${sortBy}`);
            dispatch(getPartSortedSickLeaves(newPage + 1, limit, sortBy));
        }
        else {
            console.log("вызов обычный");
            dispatch(getPartSickLeaves(newPage + 1, limit));
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <>
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
                                <TableCell align="center">Диагноз</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {part_sickLeaves.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" align='center' scope="row">
                                        {row.employee_id}
                                    </TableCell>
                                    <TableCell align="center">{row.document_id}</TableCell>
                                    <TableCell align="center">{row.start_date}</TableCell>
                                    <TableCell align="center">{row.end_date}</TableCell>
                                    <TableCell align="center">{row.diagnosis || 'нет данных'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination sx={{ display: 'flex', justifyContent: 'center' }}
                    rowsPerPageOptions={[limit]}
                    component="div"
                    count={totalPages * limit}
                    rowsPerPage={limit}
                    page={currentPage - 1}
                    onPageChange={handleChangePage}
                />

            </Box>
        </>
    );
};

export default SickLeaveMain;