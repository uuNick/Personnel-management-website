import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { getAllDocuments } from '../../actions/documentAction';
import { getEmployeeById } from "../../actions/employeeAction";
import { updateCurrentPageForSickLeave } from "../../actions/sickLeaveAction";
import { updateCurrentPageForVacation } from "../../actions/vacationAction";

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
    Typography,
} from '@mui/material';


const TableForEmployee = ({ type, employee_id, getPartSearch, }) => {

    const dispatch = useDispatch();
    const { employee } = useSelector(state => state.employee);
    const { documents } = useSelector(state => state.documents);
    const choosenStore = useSelector(state => type === 'vacation' ? state.vacation : state.sickLeave);

    const { common_part, currentPage, totalPages, total, limit, loading, error } = choosenStore;

    useEffect(() => {

        dispatch(getPartSearch(currentPage, limit, employee_id));
        if (!employee) {
            dispatch(getEmployeeById(employee_id));
        }
        if (documents.length === 0) {
            dispatch(getAllDocuments());
        }
    }, [dispatch, currentPage, limit]);

    const handleChangePage = (event, newPage) => {
        if (type === 'vacation') {
            dispatch(updateCurrentPageForVacation(newPage + 1));
        }
        else {
            dispatch(updateCurrentPageForSickLeave(newPage + 1));
        }
        dispatch(getPartSearch(newPage + 1, limit, employee_id));
    };

    const documentMap = documents.reduce((map, document) => {
        map[document.id] = document.imageUrl;
        return map;
    }, {});

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;


    return (
        <>
            {
                common_part.length > 0 ? (
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{
                                minWidth: 650
                            }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>ФИО</TableCell>
                                        <TableCell key={'document_id'} align="center" >Документ ID</TableCell>
                                        <TableCell key={'start_date'} align="center">Начало</TableCell>
                                        <TableCell key={'end_date'} align="center" >Конец</TableCell>
                                        <TableCell align="center">{type === 'vacation' ? 'Тип отпуска' : 'Диагноз'}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {common_part.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" align='center' scope="row">
                                                {employee.fullname}
                                            </TableCell>
                                            <TableCell align="center" sx={{ cursor: 'pointer' }}> {documentMap[item.document_id] && (
                                                <Link to={`http://localhost:7001${documentMap[item.document_id]}`} target="_blank">
                                                    {item.document_id}
                                                </Link>
                                            )}
                                                {!documentMap[item.document_id] && <span>{item.document_id} (No link available)</span>}</TableCell>
                                            <TableCell align="center">{item.start_date}</TableCell>
                                            <TableCell align="center">{item.end_date}</TableCell>
                                            <TableCell align="center">{[type === 'vacation' ? item.type : item.diagnosis] || 'нет данных'}</TableCell>
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
                ) : (
                    <Box>
                        <Typography variant="body1" align="center">Нет данных</Typography>
                    </Box>
                )
            }
        </>
    )
}

export default TableForEmployee;