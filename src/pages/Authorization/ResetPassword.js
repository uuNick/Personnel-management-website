import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import YupPassword from 'yup-password';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import {
    TextField,
    Button,
    Typography,
    Box,
    InputAdornment,
    FormHelperText,
    useMediaQuery
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import "./Auth.css";

YupPassword(Yup);

const validationSchema = Yup.object({
    password: Yup.string().required('Обязательное поле')
        .min(6, 'Минимум 5 символов')
        .minLowercase(1, 'Пароль должен содержать хотя бы 1 строчную букву')
        .minUppercase(1, 'Пароль должен содержать хотя бы 1 заглавную букву')
        .minNumbers(1, 'Пароль должен содержать хотя бы 1 цифру')
        .minSymbols(1, 'Пароль должен содержать хотя бы 1 специальный символ'),
    repeat_password: Yup.string()
        .required('Обязательное поле')
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

const Registration = () => {

    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [showPassword_1, setShowPassword_1] = useState(false);
    const [showPassword_2, setShowPassword_2] = useState(false);

    const handleClickShowPassword_1 = () => setShowPassword_1((show) => !show);
    const handleClickShowPassword_2 = () => setShowPassword_2((show) => !show);

    const formik = useFormik({
        initialValues: {
            password: '',
            repeat_password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const urlSearchParams = new URLSearchParams(window.location.search); //Bad practice
                const params = Object.fromEntries(urlSearchParams.entries());
                const token = params.token
                const response = await resetPassword(token, values);
                navigate('/login');
                resetForm();
            } catch (e) {
                if (e.message.includes("просрочен")) {
                    setError("Токен просрочен");
                } else {
                    console.error("Ошибка смены пароля:", e);
                    setError("Произошла ошибка при смены пароля");
                }
                console.log(e);
            }
        },
    });

    const handlePasswordChange = (event) => {
        formik.handleChange(event);
        setError(''); 
    };

    const isSmallScreen = useMediaQuery('(max-width:500px)');

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
                    Новый пароль
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label='Пароль'
                    name="password"
                    id="password"
                    type={showPassword_1 ? "text" : "password"}
                    onChange={handlePasswordChange}
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword_1 ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword_1}
                                >
                                    {showPassword_1 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        sx: {
                            fontSize: {
                                xs: '0.8rem', // Для экранов меньше 600px
                                sm: '1rem', // Для экранов от 600px до 900px
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label={isSmallScreen ? 'Пароль' : 'Повторите пароль'} // Условная логика для метки
                    name="repeat_password"
                    id="repeat_password"
                    type={showPassword_2 ? "text" : "password"}
                    onChange={handlePasswordChange}
                    value={formik.values.repeat_password}
                    error={formik.touched.repeat_password && Boolean(formik.errors.repeat_password)}
                    helperText={formik.touched.repeat_password && formik.errors.repeat_password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword_2 ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword_2}
                                >
                                    {showPassword_2 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        sx: {
                            fontSize: {
                                xs: '0.8rem', // Для экранов меньше 600px
                                sm: '1rem', // Для экранов от 600px до 900px
                            },
                        },
                    }}
                />
                {error && (
                    <FormHelperText error sx={{ color: 'red', margin: "0", textAlign: "start" }}>
                        {error}
                    </FormHelperText>
                )}
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary.contrastText"
                    sx={{ marginTop: "10px" }}
                >
                    Сбросить пароль
                </Button>
            </Box>
        </div>
    );
};

export default Registration;