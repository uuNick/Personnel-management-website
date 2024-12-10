import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
//import { login } from "../services/authService";
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import {
    TextField,
    Button,
    Typography,
    Box,
    InputAdornment,
    FormHelperText,
    Alert,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import "./Auth.css";

YupPassword(Yup);

const validationSchema = Yup.object({
    username: Yup.string().required('Обязательное поле').min(3, 'Минимум 4 символа'),
    password: Yup.string().required('Обязательное поле')
        .min(6, 'Минимум 5 символов')
});

const Login = () => {

    const navigate = useNavigate();


    const [usernameError, setUsernameError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                //const response = await login(values.username, values.password);
                //console.log(response);
                //setUsernameError('');
                //localStorage.setItem('roleNames', response.roleNames);
                //localStorage.setItem('token', response.token);
                //navigate('/furniture');
                resetForm();
            } catch (e) {
                if (e.message.includes("неверный")) {
                    setUsernameError("Неверный логин или пароль");
                } else {
                    console.error("Ошибка регистрации:", e);
                    setUsernameError("Произошла ошибка при регистрации.");
                }
            }
        },
    });

    const handleUsernamePasswordChange = (event) => {
        formik.handleChange(event); 
        setUsernameError('')
    };

    return (
        <div className="all_device_div">
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
                    Авторизация
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="username"
                    name="username"
                    label="Имя пользователя"
                    value={formik.values.username}
                    onChange={handleUsernamePasswordChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label='Пароль'
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleUsernamePasswordChange}
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {usernameError && (
                    <FormHelperText error sx={{ color: 'red', margin: "0", textAlign: "start" }}>
                        {usernameError}
                    </FormHelperText>
                )}
                <Typography><Link to="/reset" style={{ display: "block", textAlign: "end" }}>Забыли пароль</Link></Typography>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary.contrastText"
                    sx={{ marginTop: "10px", marginBottom: "20px" }}
                >
                    Войти
                </Button>
                <Typography>У вас нету аккаунта?<Link to="/registration">Зарегистрироваться</Link></Typography>
            </Box>
        </div>
    );
};

export default Login;