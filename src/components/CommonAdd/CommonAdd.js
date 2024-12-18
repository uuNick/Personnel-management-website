import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import DocumentService from '../../services/documentService';
import VacationService from '../../services/vacationsService';
import SickLeaveService from '../../services/sickLeaveService';
import DayOffService from '../../services/dayOffService';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Snackbar,
    FormControl,
    FormHelperText
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const VACATION = 'vacation';
const SICKLEAVE = 'sickLeave';
const DAYOFF = 'dayOff';


const validationSchema_1 = Yup.object({
    start_date: Yup.date()
        .required('Укажите дату начала'),
    end_date: Yup.date()
        .required('Укажите дату конца')
        .test('end-date-after-start-date', 'Дата конца должна быть не раньше даты начала', function (value) {
            return value >= this.parent.start_date;
        }),
    type: Yup.string()
        .required('Укажите тип отпуска')
        .min(7, 'Тип отпуска не может содержать меньше 7 символов')
        .max(50, 'Тип отпуска не может содержать больше 50 символов'),
});

const validationSchema_2 = Yup.object({
    start_date: Yup.date()
        .required('Укажите дату начала'),
    end_date: Yup.date()
        .required('Укажите дату конца')
        .test('end-date-after-start-date', 'Дата конца должна быть не раньше даты начала', function (value) {
            return value >= this.parent.start_date;
        }),
});


const CommonAdd = ({ action_type }) => {
    const { id } = useParams();

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState(null);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleActionSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpen(true);
    };

    const handleActionError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            start_date: '',
            end_date: '',
            type: '',
            diagnosis: '',
            notes: '',
            reason: '',
        },
        validationSchema: action_type === 'vacation' ? validationSchema_1 : validationSchema_2,
        onSubmit: async (values, { resetForm }) => {
            if (imageError) {
                return;
            }
            try {
                if (action_type === VACATION || action_type === SICKLEAVE) {
                    if (!image) {
                        setImageError("Необходимо обязательно загрузить документ");
                        return;
                    }
                    const formData = new FormData();
                    formData.append('pdfFile', image);
                    formData.append('employee_id', id);
                    if (action_type === VACATION) {
                        formData.append('document_type', 'Приказ на отпуск');
                    }
                    else {
                        formData.append('document_type', 'Больничный лист');
                    }
                    const uploadDate = format(new Date(), 'yyyy-MM-dd', { locale: ru });
                    formData.append('upload_date', uploadDate);
                    formData.append('notes', values.notes);
                    const response = await DocumentService.createDocument(formData);
                    const document_id = response.data.id;
                    if (action_type === VACATION) {
                        await VacationService.createVacation({ employee_id: id, document_id: document_id, start_date: values.start_date, end_date: values.end_date, type: values.type });
                        handleActionSuccess('Отпуск успешно создан');
                        resetForm();
                    }
                    else {
                        await SickLeaveService.createSickLeave({ employee_id: id, document_id: document_id, start_date: values.start_date, end_date: values.end_date, diagnosis: values.diagnosis });
                        handleActionSuccess('Больничный успешно создан');
                        resetForm();
                    }
                }
                else {
                    await DayOffService.createDayOff({ employee_id: id, start_date: values.start_date, end_date: values.end_date, reason: values.reason });
                    handleActionSuccess('Прогул успешно создан');
                    resetForm();
                }
                setImage(null);
                setImageError(null);
            } catch (e) {
                console.error(e);
                if (action_type === VACATION) {
                    handleActionError('Ошибка при добавлении отпуска');
                } else if (action_type === SICKLEAVE) {
                    handleActionError('Ошибка при добавлении больничного листа');
                }
                else {
                    handleActionError('Ошибка при добавлении прогула');
                }
                resetForm();
            }
        },
    });

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/manager');
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setImageError('Разрешены только файлы PDF.');
                setImage(null);
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setImageError('Размер файла превышает 5MB.');
                setImage(null);
                return;
            }

            setImage(file);
            setImageError(null);
        } else {
            setImage(null);
            setImageError(null);
        }
    };

    return (
        <>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate
                sx={{
                    maxWidth: '250px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    textAlign: 'center',
                    padding: "30px",
                    borderRadius: '20px',
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
                    //margin: "20px auto"
                }}>
                {(action_type === VACATION || action_type === SICKLEAVE) && (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Добавление документа
                        </Typography>
                        <FormControl fullWidth margin="normal" error={Boolean(imageError)}>
                            <input
                                accept="file/*"
                                id="file"
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file">
                                <Button variant="contained" component="span" sx={{ border: "1px solid #D8D8D8", backgroundColor: "white" }} color='primary.contrastText' tabIndex={-1} startIcon={<CloudUploadIcon />} >
                                    Выбрать документ
                                </Button>
                            </label>
                            {imageError && <FormHelperText>{imageError}</FormHelperText>}
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="notes"
                            name="notes"
                            label="Заметки"
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            error={formik.touched.notes && Boolean(formik.errors.notes)}
                            helperText={formik.touched.notes && formik.errors.notes}
                            size="small"
                        />
                    </>
                )}
                <Typography variant="h5" gutterBottom>
                    {action_type === VACATION ? 'Добавление отпуска' :
                        action_type === SICKLEAVE ? 'Добавление больничного' :
                            action_type === DAYOFF ? 'Добавление прогула' :
                                'Добавление'}
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="start_date"
                    name="start_date"
                    label="Начало"
                    value={formik.values.start_date}
                    onChange={formik.handleChange}
                    error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                    helperText={formik.touched.start_date && formik.errors.start_date}
                    size="small"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="end_date"
                    name="end_date"
                    label="Конец"
                    value={formik.values.end_date}
                    onChange={formik.handleChange}
                    error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                    helperText={formik.touched.end_date && formik.errors.end_date}
                    size="small"
                />
                {action_type === VACATION && (
                    <>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="type"
                            name="type"
                            label="Тип отпуска"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type}
                            size="small"
                        />
                    </>
                )}
                {action_type === SICKLEAVE && (
                    <>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="diagnosis"
                            name="diagnosis"
                            label="Диагноз"
                            value={formik.values.diagnosis}
                            onChange={formik.handleChange}
                            error={formik.touched.diagnosis && Boolean(formik.errors.diagnosis)}
                            helperText={formik.touched.diagnosis && formik.errors.diagnosis}
                            size="small"
                        />
                    </>
                )}
                {action_type === DAYOFF && (
                    <>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="reason"
                            name="reason"
                            label="Причина"
                            value={formik.values.reason}
                            onChange={formik.handleChange}
                            error={formik.touched.reason && Boolean(formik.errors.reason)}
                            helperText={formik.touched.reason && formik.errors.reason}
                            size="small"
                        />
                    </>
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" color='primary.contrastText' type="submit" sx={{ width: "120px", height: "60px", border: "1px solid #D8D8D8", backgroundColor: "white" }}>
                        Добавить
                    </Button>
                    <Button variant="outlined" color='primary.contrastText' sx={{ border: "1px solid #D8D8D8", backgroundColor: "white" }} onClick={goBack}>
                        Назад
                    </Button>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CommonAdd;