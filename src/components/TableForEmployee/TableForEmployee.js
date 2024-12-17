import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { getAllDocuments } from '../../actions/documentAction';
import { getEmployeeById } from "../../actions/employeeAction";
import { updateCurrentPageForSickLeave } from "../../actions/sickLeaveAction";
import { updateCurrentPageForVacation } from "../../actions/vacationAction";
import exportService from '../../services/exportService';
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
    Button,
} from '@mui/material';
import hostServerJSON from "../../hostServer.json";
const hostServer = hostServerJSON.localhost_path;


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

    // const employeeMap = employees.reduce((map, employee) => {
    //     map[employee.id] = employee.fullname;
    //     return map;
    // }, {});


    const addFullName = (data) => {
        const updatedData = data.map(item => {
            return {
                fullname: employee.fullname,
                ...item,
            };
        });
        updatedData.forEach(item => delete item.id);
        updatedData.forEach(item => delete item.employee_id);
        return updatedData
    }

    const exportExcel = async (data) => {
        const updatedData = addFullName(data);
        try {
            const response = await exportService.exportExcel(updatedData);
            const url = window.URL.createObjectURL(new Blob([response]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `report_${employee.id}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Ошибка при скачивании Excel файла:', error);
        }
    }

    const exportWord = async (data) => {
        const updatedData = addFullName(data);
        try {
            const response = await exportService.exportWord(updatedData);
            const url = window.URL.createObjectURL(new Blob([response]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `document_${employee_id}.docx`);

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Освобождаем память
        } catch (error) {
            console.error('Ошибка при скачивании Word файла:', error);
        }
    }

    const exportPdf = async (data) => {
        const updatedData = addFullName(data);
        try {
            const response = await exportService.exportPdf(updatedData);
            const url = window.URL.createObjectURL(new Blob([response]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Report_${employee_id}.pdf`);

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Ошибка при скачивании PDF файла:', error);
        }
    }

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
                                                    <Link to={`${hostServer}${documentMap[item.document_id]}`} target="_blank">
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
                        <Button size="small" color='primary.contrastText' sx={{ fontSize: '14px' }} onClick={() => exportExcel(common_part)}>Excel</Button>
                        <Button size="small" color='primary.contrastText' sx={{ fontSize: '14px', margin: "0 20px" }} onClick={() => exportPdf(common_part)}>PDF</Button>
                        <Button size="small" color='primary.contrastText' sx={{ fontSize: '14px' }} onClick={() => exportWord(common_part)}>Word</Button>
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