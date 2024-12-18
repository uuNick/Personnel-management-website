import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { getAllDocuments } from '../../actions/documentAction';
import { getEmployeeById } from "../../actions/employeeAction";
import { updateCurrentPageForSickLeave } from "../../actions/sickLeaveAction";
import { updateCurrentPageForVacation } from "../../actions/vacationAction";
import { updateCurrentPageForDaysOff } from "../../actions/dayOffActions";
import documentService from '../../services/documentService';
import vacationService from '../../services/vacationsService';
import sickLeaveService from '../../services/sickLeaveService';
import dayOffService from '../../services/dayOffService';

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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    IconButton,
    Alert,
    Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import hostServerJSON from "../../hostServer.json";
const hostServer = hostServerJSON.localhost_path;
const MANAGERROLE = 'РУКОВОДИТЕЛЬ';
const INSPECTORROLE = 'ИНСПЕКТОР';


const currentRole = localStorage.getItem('roleNames');

const mapping = {
    vacation: "отпуск",
    sickLeave: "больничный лист",
    dayOff: "прогул"
}

const TableForEmployee = ({ type, employee_id, getPartSearch, }) => {

    const dispatch = useDispatch();
    const { employee } = useSelector(state => state.employee);
    const { documents } = useSelector(state => state.documents);
    const [reload, setReload] = useState(false);
    const { common_part, currentPage, totalPages, total, limit, loading, error } = useSelector(state => {
        if (type === 'vacation') {
            return state.vacation;
        } else if (type === 'sickLeave') {
            return state.sickLeave;
        } else {
            return state.dayOff;
        }
    });

    const [open, setOpen] = useState(false);
    const [documentId, setDocumentId] = useState(null);
    const [idForDelete, setIdForDelete] = useState(null);

    const [openPush, setOpenPush] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenPush(false);
    };

    const handleDeleteSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpenPush(true);
    };

    const handleDeleteError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpenPush(true);
    };


    useEffect(() => {

        dispatch(getPartSearch(currentPage, limit, employee_id));
        if (!employee) {
            dispatch(getEmployeeById(employee_id));
        }
        if (documents.length === 0) {
            dispatch(getAllDocuments());
        }
    }, [dispatch, currentPage, limit, reload]);

    const handleChangePage = (event, newPage) => {
        if (type === 'vacation') {
            dispatch(updateCurrentPageForVacation(newPage + 1));
        }
        else if (type === 'sickLeave') {
            dispatch(updateCurrentPageForSickLeave(newPage + 1));
        }
        else {
            dispatch(updateCurrentPageForDaysOff(newPage + 1));
        }
        dispatch(getPartSearch(newPage + 1, limit, employee_id));
    };


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
            window.URL.revokeObjectURL(url);
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

    let documentMap = {};
    if (type !== 'dayOff') {
        documentMap = documents.reduce((map, document) => {
            map[document.id] = document.imageUrl;
            return map;
        }, {});
    }
    const handleModalOpen = (item) => {
        setDocumentId(item.document_id);
        setIdForDelete(item.id);
        setOpen(true);
    };

    const handleModalClose = () => {
        setDocumentId(null);
        setIdForDelete(null);
        setOpen(false);
    };

    const handleModalConfirm = async () => {
        if (type === 'vacation') {
            try {
                await documentService.deleteDocument(documentId);
                //await vacationService.deleteVacation(idForDelete);
                handleDeleteSuccess("Отпуск был успешно удалён");
            } catch (e) {
                console.log(e);
                handleDeleteError("Ошибка при удалении отпуска");
            }
        } else if (type === 'sickLeave') {
            try {
                await documentService.deleteDocument(documentId);
                //await sickLeaveService.deleteSickLeave(idForDelete);
                handleDeleteSuccess("Больничный лист был успешно удалён");
            } catch (e) {
                console.log(e);
                handleDeleteError("Ошибка при удалении больничного листа");
            }
        }
        else {
            try {
                await dayOffService.deleteDayOff(idForDelete);
                handleDeleteSuccess("Прогул был успешно удалён");
            } catch (e) {
                console.log(e);
                handleDeleteError("Ошибка при удалении прогула");
            }
        }
        setOpen(false);
        setDocumentId(null);
        setIdForDelete(null);
        setReload(!reload)
    };




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
                                    minWidth: 750
                                }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>ФИО</TableCell>
                                            {['vacation', 'sickLeave'].includes(type) && (
                                                <TableCell key={'document_id'} align="center">
                                                    Документ ID
                                                </TableCell>
                                            )}
                                            <TableCell key={'start_date'} align="center">Начало</TableCell>
                                            <TableCell key={'end_date'} align="center" >Конец</TableCell>
                                            <TableCell align="center">{
                                                (() => {
                                                    if (type === 'vacation') return 'Тип отпуска';
                                                    if (type === 'sickLeave') return 'Диагноз';
                                                    return 'Причина';
                                                })()
                                            }</TableCell>
                                            {currentRole === INSPECTORROLE && (
                                                <TableCell align="center" sx={{ padding: "5px" }}>
                                                    Удаление
                                                </TableCell>
                                            )}
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
                                                {currentRole === INSPECTORROLE && (
                                                    <TableCell align="center" sx={{ cursor: 'pointer' }}>
                                                        <IconButton color="primary.contrastText" sx={{ p: '0' }} aria-label="clear" onClick={() => handleModalOpen(item)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                )}
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
            <Dialog open={open} onClose={handleModalClose}>
                <DialogTitle>Подтверждение выхода</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы уверены, что хотите удалить {mapping[type]}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalConfirm} color="error">Удалить</Button>
                    <Button onClick={handleModalClose} color='primary.contrastText'>Отмена</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openPush} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default TableForEmployee;