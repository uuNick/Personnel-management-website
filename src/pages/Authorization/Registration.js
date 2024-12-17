import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import YupPassword from 'yup-password';
import { useNavigate } from 'react-router-dom';
import { registration } from '../../services/authService';
import {
    TextField,
    Button,
    Typography,
    Box,
    InputAdornment,
    FormHelperText,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import "./Auth.css";

YupPassword(Yup);

const validationSchema = Yup.object({
    email: Yup.string().required('Обязательное поле').email('Некорректный формат email'),
    username: Yup.string().required('Обязательное поле').min(3, 'Минимум 4 символа'),
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

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showPassword_1, setShowPassword_1] = useState(false);
    const [showPassword_2, setShowPassword_2] = useState(false);

    const handleClickShowPassword_1 = () => setShowPassword_1((show) => !show);
    const handleClickShowPassword_2 = () => setShowPassword_2((show) => !show);

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            repeat_password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await registration(values);
                console.log(response);
                setUsernameError('');
                setEmailError('');
                localStorage.setItem('roleNames', response.roleNames);
                localStorage.setItem('token', response.token);
                navigate('/manager');
                resetForm();
            } catch (e) {
                if (e.message.includes("уже существует")) {
                    setUsernameError("Пользователь с таким именем существует");
                } else if (e.message.includes("занят")) {
                    setEmailError("Адрес электронный почты уже зарегистрированн");
                }
                else {
                    console.error("Ошибка регистрации:", e);
                    setUsernameError("Произошла ошибка при регистрации.");
                }
            }
        },
    });

    const handleEmailChange = (event) => {
        formik.handleChange(event);
        setEmailError('');
    };

    const handleUserNameChange = (event) => {
        formik.handleChange(event);
        setUsernameError('');
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
                    Регистрация
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={handleEmailChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                {emailError && (
                    <FormHelperText error sx={{ color: 'red', margin: "0", textAlign: "center" }}>
                        {emailError}
                    </FormHelperText>
                )}
                <TextField
                    fullWidth
                    margin="normal"
                    id="username"
                    name="username"
                    label="Имя пользователя"
                    value={formik.values.username}
                    onChange={handleUserNameChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                {usernameError && (
                    <FormHelperText error sx={{ color: 'red', margin: "0", textAlign: "center" }}>
                        {usernameError}
                    </FormHelperText>
                )}
                <TextField
                    fullWidth
                    margin="normal"
                    label='Пароль'
                    name="password"
                    id="password"
                    type={showPassword_1 ? "text" : "password"}
                    onChange={formik.handleChange}
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
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label='Повторите пароль'
                    name="repeat_password"
                    id="repeat_password"
                    type={showPassword_2 ? "text" : "password"}
                    onChange={formik.handleChange}
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
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary.contrastText"
                    sx={{ marginTop: "10px", marginBottom: "20px" }}
                >
                    Зарегистрироваться
                </Button>
                <Typography>Уже есть аккаунт?<Link to="/login">Войти</Link></Typography>
            </Box>
        </div>
    );
};

export default Registration;