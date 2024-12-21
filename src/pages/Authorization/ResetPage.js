import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import { Link } from 'react-router-dom';
import YupPassword from 'yup-password';
import { useNavigate } from 'react-router-dom';
import { resetPasswwordRequest } from '../../services/authService';
import {
    TextField,
    Button,
    Typography,
    Box,
    FormHelperText,
    Alert,
    Snackbar
} from '@mui/material';

import "./Auth.css";

YupPassword(Yup);


const validationSchema = Yup.object({
    email: Yup.string().required('Введите адрес электронной почты').email('Некорректный формат email')
});

const Registration = () => {

    const navigate = useNavigate();

    const [emailError, setEmailError] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSendLinkSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpen(true);
    };

    const handleSendLinkError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await resetPasswwordRequest(values);
                console.log(response);
                setEmailError('');
                handleSendLinkSuccess("Письмо с восстанавливающей ссылкой отправлено");
                resetForm();
            } catch (e) {
                if (e.message.includes("не зарегистрированн")) {
                    setEmailError("Адрес электронной почты не зарегистрирован");
                    handleSendLinkError(e.message);
                } else {
                    console.error("Ошибка регистрации:", e);
                    setEmailError("Произошла ошибка при отправке письма");
                    handleSendLinkError(e.message);
                }
            }
        },
    });

    const handleEmailChange = (event) => {
        formik.handleChange(event);
        setEmailError(''); 
    };

    return (
        <div className='all_device_div'>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate
                sx={{
                    maxWidth: '30em',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    textAlign: 'center',
                    backgroundColor: 'white',
                    padding: "30px",
                    borderRadius: '20px'
                }}>
                <Typography variant="h5" gutterBottom>
                    Получение ссылки
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    name="email"
                    label="Адрес электронной почты"
                    value={formik.values.email}
                    onChange={handleEmailChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                {emailError && (
                    <FormHelperText error sx={{ color: 'red', margin: "0", textAlign: "start" }}>
                        {emailError}
                    </FormHelperText>
                )}
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary.contrastText"
                    sx={{ marginTop: "10px", marginBottom: "20px" }}
                >
                    Отправить ссылку
                </Button>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Registration;