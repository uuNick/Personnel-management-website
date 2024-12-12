import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import EmployeeService from '../services/employeeService';
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

const validationSchema = Yup.object({
    fullname: Yup.string()
        .required('Укажите ФИО работника')
        .min(10, 'ФИО не может быть меньше 10 символов'),
    birth_date: Yup.date()
        .required('Укажите дату рождения')
        .min(new Date('1950-01-01'), 'Дата рождения должна быть не раньше 1950 года')
        .max(new Date('2004-12-31'), 'Дата рождения должна быть не позже 2004 года'),
    position: Yup.string()
        .required('Укажите должность сотрудника')
        .min(3, 'Должность должна содержать больше 3 символов'),
    start_date: Yup.date()
        .required('Укажите дату принятия на работу')
        .min(new Date('1950-01-01'), 'Дата принятия должна быть не раньше 1950 года')
        .max(new Date('2024-12-31'), 'Дата принятия должна быть не позже 2024 года'),
    phone_number: Yup.string()
        .required('Укажите номер телефона')
        .matches(/^\+?[0-9]+$/, "Укажите цифры или знак '+' в начале")
        .min(10, 'Номер должен содержать минимум 10 цифр')
        .max(20, 'Номер не может превышать 20 цифр'),
    email: Yup.string()
        .email('Некорректный формат email'),
    address: Yup.string()
        .required('Укажите адрес работника')
        .min(10, 'адрес не может быть меньше 10 символов')
});

const RedactEmployee = () => {

    const location = useLocation();
    const [item, setItem] = useState(location.state || { fullname: '', birth_date: '', position: '', start_date: '', phone_number: '', email: '', address: '', });
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

    const handleRedactEmployeeSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpen(true);
    };

    const handleRedactEmployeeError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            fullname: item.fullname,
            birth_date: item.birth_date,
            position: item.position,
            start_date: item.start_date,
            phone_number: item.phone_number,
            email: item.email || '',
            address: item.address,

        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const initialValues = {
                fullname: item.fullname,
                birth_date: item.birth_date,
                position: item.position,
                start_date: item.start_date,
                phone_number: item.phone_number,
                email: item.email || '',
                address: item.address,
            };

            const hasChanges = Object.keys(values).some(key => values[key] !== initialValues[key]);

            if (!hasChanges && !image) {
                handleRedactEmployeeError('Данные остались без изменений');
                return;
            }

            if (imageError) {
                return;
            }

            try {
                if (image) {
                    const formData = new FormData();
                    formData.append('image', image);
                    await EmployeeService.updateEmployeeImage(id, formData);
                }
                if (hasChanges) {
                    const updatedValues = { ...values };
                    if (!updatedValues.email) {
                        updatedValues.email = null;
                    }
                    await EmployeeService.updateEmployee(id, updatedValues);
                    const updatedItem = await EmployeeService.getEmployeeById(id);
                    setItem(updatedItem);
                }
                handleRedactEmployeeSuccess('Работник успешно изменен');
                setImage(null);
                setImageError(null);
            } catch (e) {
                console.error(e);
                handleRedactEmployeeError('Ошибка при обновлении работника');
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
            const allowedTypes = ['image/png', 'image/jpeg'];
            if (!allowedTypes.includes(file.type)) {
                setImageError('Разрешены только файлы PNG и JPEG.');
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
                    textAlign: 'center',
                    padding: "30px",
                    borderRadius: '20px',
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
                    margin: "20px auto"
                }}>
                <Typography variant="h5" gutterBottom>
                    Редактирование работника
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="fullname"
                    name="fullname"
                    label="ФИО работника"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                    helperText={formik.touched.fullname && formik.errors.fullname}
                    size="small"
                />
                <FormControl fullWidth margin="normal" error={Boolean(imageError)}>
                    <input
                        accept="image/*"
                        id="image"
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="image">
                        <Button variant="contained" component="span" sx={{ border: "1px solid #D8D8D8", backgroundColor: "white" }} color='primary.contrastText' tabIndex={-1} startIcon={<CloudUploadIcon />} >
                            Выбрать фото
                        </Button>
                    </label>
                    {imageError && <FormHelperText>{imageError}</FormHelperText>}
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    id="birth_date"
                    name="birth_date"
                    label="Дата рождения"
                    value={formik.values.birth_date}
                    onChange={formik.handleChange}
                    error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
                    helperText={formik.touched.birth_date && formik.errors.birth_date}
                    size="small"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="position"
                    name="position"
                    label="Должность"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    error={formik.touched.position && Boolean(formik.errors.position)}
                    helperText={formik.touched.position && formik.errors.position}
                    size="small"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="start_date"
                    name="start_date"
                    label="Дата принятия на работу"
                    value={formik.values.start_date}
                    onChange={formik.handleChange}
                    error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                    helperText={formik.touched.start_date && formik.errors.start_date}
                    size="small"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="phone_number"
                    name="phone_number"
                    label="Номер телефона"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                    size="small"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="address"
                    name="address"
                    label="Адрес"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                    size="small"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    size="small"
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" color='primary.contrastText' type="submit" sx={{ width: "120px", height: "60px", border: "1px solid #D8D8D8", backgroundColor: "white" }}>
                        Изменить
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

export default RedactEmployee;