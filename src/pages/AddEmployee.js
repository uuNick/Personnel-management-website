import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import * as Yup from 'yup';
// import { createFurnitureModel } from '../actions/FurnitureModel/furnitureModelActions';
// import {
//     TextField,
//     Button,
//     Box,
//     Typography,
//     Alert,
//     Snackbar,
//     FormControl,
//     InputLabel,
//     FormHelperText
// } from '@mui/material';

// const validationSchema = Yup.object({
//     furniture_name: Yup.string().required('Укажите название мебели'),
//     model: Yup.string().required('Укажите модель'),
//     characteristics: Yup.string().required('Укажите характеристики модели мебели')
//         .min(10, 'Характеристика должна содержать больше 10 символов'),
//     price: Yup.number().required('Укажите цену').positive('Цена должна быть положительной'),
// });

const AddEmployee = () => {

    // const dispatch = useDispatch();
    // const [open, setOpen] = useState(false);
    // const [severity, setSeverity] = useState('success');
    // const [message, setMessage] = useState('');
    // const [image, setImage] = useState(null); // Состояние для изображения
    // const [imageError, setImageError] = useState(null); // Состояние для ошибки изображения

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };

    // const handleCreatFurnitureSuccess = (message) => {
    //     setSeverity('success');
    //     setMessage(message);
    //     setOpen(true);
    // };

    // const handleCreateFurnitureError = (message) => {
    //     setSeverity('error');
    //     setMessage(message);
    //     setOpen(true);
    // };

    // const formik = useFormik({
    //     initialValues: {
    //         furniture_name: '',
    //         model: '',
    //         characteristics: '',
    //         price: '',
    //     },
    //     validationSchema: validationSchema,
    //     onSubmit: (values, { resetForm }) => {
    //         try {
    //             const formData = new FormData();
    //             formData.append('image', image);
    //             for (const key in values) {
    //                 formData.append(key, values[key]);
    //             }
    //             dispatch(createFurnitureModel(formData));
    //             handleCreatFurnitureSuccess("Модель мебели успешно создана");
    //             resetForm();
    //             setImage(null); // Очищаем состояние изображения после успешной отправки
    //             setImageError(null);
    //         } catch (e) {
    //             handleCreateFurnitureError(`Ошибка при создании модели мебели`);
    //         }
    //     },
    // });

    // const navigate = useNavigate();

    // const goBack = () => {
    //     navigate('/furniture');
    // }

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         if (file.size > 5 * 1024 * 1024) { // Проверка размера файла (5MB)
    //             setImageError('Размер файла превышает 5MB');
    //             setImage(null);
    //         } else {
    //             setImage(file);
    //             setImageError(null);
    //         }
    //     } else {
    //         setImage(null);
    //         setImageError(null);
    //     }
    // };

    return (
        <></>
        // <>
        //     <Box component="form" onSubmit={formik.handleSubmit} noValidate
        //         sx={{
        //             maxWidth: '30em',
        //             position: 'absolute',
        //             top: '50%',
        //             left: '50%',
        //             transform: 'translate(-50%,-50%)',
        //             textAlign: 'center',
        //         }}>
        //         <Typography variant="h5" gutterBottom>
        //             Создать модель мебели
        //         </Typography>
        //         <TextField
        //             fullWidth
        //             margin="normal"
        //             id="furniture_name"
        //             name="furniture_name"
        //             label="Название мебели"
        //             value={formik.values.furniture_name}
        //             onChange={formik.handleChange}
        //             error={formik.touched.furniture_name && Boolean(formik.errors.furniture_name)}
        //             helperText={formik.touched.furniture_name && formik.errors.furniture_name}
        //         />
        //         <FormControl fullWidth margin="normal" error={Boolean(imageError)}>
        //             {/* <InputLabel htmlFor="image">Изображение</InputLabel> */}
        //             <input
        //                 accept="image/*"
        //                 id="image"
        //                 type="file"
        //                 onChange={handleImageChange}
        //                 style={{ display: 'none' }}
        //             />
        //             <label htmlFor="image">
        //                 <Button variant="outlined" component="span" color='primary.contrastText'>
        //                     Выбрать изображение
        //                 </Button>
        //             </label>
        //             {imageError && <FormHelperText>{imageError}</FormHelperText>}
        //         </FormControl>
        //         <TextField
        //             fullWidth
        //             margin="normal"
        //             id="model"
        //             name="model"
        //             label="Модель"
        //             value={formik.values.model}
        //             onChange={formik.handleChange}
        //             error={formik.touched.model && Boolean(formik.errors.model)}
        //             helperText={formik.touched.model && formik.errors.model}
        //         />
        //         <TextField
        //             fullWidth
        //             margin="normal"
        //             id="characteristics"
        //             name="characteristics"
        //             label="Характеристики"
        //             value={formik.values.characteristics}
        //             onChange={formik.handleChange}
        //             error={formik.touched.characteristics && Boolean(formik.errors.characteristics)}
        //             helperText={formik.touched.characteristics && formik.errors.characteristics}
        //         />
        //         <TextField
        //             fullWidth
        //             margin="normal"
        //             id="price"
        //             name="price"
        //             label="Цена"
        //             value={formik.values.price}
        //             onChange={formik.handleChange}
        //             error={formik.touched.price && Boolean(formik.errors.price)}
        //             helperText={formik.touched.price && formik.errors.price}
        //         />
        //         {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        //             <Button variant="outlined" color='primary.contrastText' type="submit" sx={{ width: "170px" }}>
        //                 Создать модель мебели
        //             </Button>
        //             <Button variant="outlined" color='primary.contrastText' onClick={goBack}>
        //                 Назад
        //             </Button>
        //         </Box> */}
        //     </Box>
        //     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        //         <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        //             {message}
        //         </Alert>
        //     </Snackbar>
        // </>
    );
};

export default AddEmployee;