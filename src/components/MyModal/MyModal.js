import React from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import exportService from '../../services/exportService';
import {
    Modal,
    TextField,
    Button,
    Box,
} from '@mui/material';


function dateDifferenceInDays(date1Str, date2Str) {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);

    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

const validationSchema_1 = Yup.object({
    document_date: Yup.date()
        .min(new Date(), 'Дата принятия должна быть не раньше сегодняшней даты'),
    dismiss_date: Yup.date()
        .required('Укажите дату увольнения сотрудника')
        .min(new Date(), 'Дата увольнения должна быть не раньше сегодняшней даты'),
});

const validationSchema_2 = Yup.object({
    start_date: Yup.date()
        .required('Укажите дату начала отпуска')
        .min(new Date(), 'Дата начала отпуска должна быть не раньше сегодняшней даты'),
    end_date: Yup.date()
        .required('Укажите дату конца отпуска')
        .test('end-date-after-start-date', 'Дата конца должна быть не раньше даты начала', function (value) {
            return value >= this.parent.start_date;
        }),
    type_of_vacation: Yup.string()
        .required('Укажите тип отпуска')
        .min(3, 'Тип отпуска должен содержать больше 3 символов'),
});

const MyModal = ({ open, handleClose, type, item }) => {

    const formik = useFormik({
        initialValues: {
            document_date: '',
            dismiss_date: '',
            start_date: '',
            end_date: '',
            type_of_vacation: '',
        },
        validationSchema: type === 'dismissal' ? validationSchema_1 : validationSchema_2,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (type === 'dismissal') {
                    const response = await exportService.exportWordDismissal({ document_date: values.document_date, position: item.position, dismiss_date: values.dismiss_date, fullname: item.fullname });
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${type}_reportDocument_${Date.now()}.docx`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                }
                else {
                    const amount = dateDifferenceInDays(values.start_date, values.end_date)
                    const response = await exportService.exportWordVacation({ fullname: item.fullname, position: item.position, type: values.type_of_vacation, amount: amount, start_date: values.start_date, end_date: values.end_date });
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${type}_reportDocument_${Date.now()}.docx`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                }
                console.log('sucess');
                resetForm();
            } catch (e) {
                console.log(e);
            }
        },
    });

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component='form' onSubmit={formik.handleSubmit} noValidate
                    sx={{
                        maxWidth: '250px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        textAlign: 'center',
                        backgroundColor: '#FAFAFA',
                        padding: "30px",
                        borderRadius: '20px',
                        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
                        // margin: "20px auto"
                        // display: 'flex',
                        // flexWrap: 'wrap',
                        // gap: '20px'
                    }}>
                    {type === 'dismissal' && (
                        <>
                            <TextField
                                fullWidth
                                margin="normal"
                                id="document_date"
                                name="document_date"
                                label="Дата составления документа"
                                value={formik.values.document_date}
                                onChange={formik.handleChange}
                                error={formik.touched.document_date && Boolean(formik.errors.document_date)}
                                helperText={formik.touched.document_date && formik.errors.document_date}
                                size="small"
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="dismiss_date"
                                name="dismiss_date"
                                label="Дата увольнения"
                                value={formik.values.dismiss_date}
                                onChange={formik.handleChange}
                                error={formik.touched.dismiss_date && Boolean(formik.errors.dismiss_date)}
                                helperText={formik.touched.dismiss_date && formik.errors.dismiss_date}
                                size="small"
                            />
                        </>
                    )}
                    {type === 'vacation' && (
                        <>
                            <TextField
                                fullWidth
                                margin="normal"
                                id="start_date"
                                name="start_date"
                                label="Начало отпуска"
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
                                label="Конец отпуска"
                                value={formik.values.end_date}
                                onChange={formik.handleChange}
                                error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                                helperText={formik.touched.end_date && formik.errors.end_date}
                                size="small"
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="type_of_vacation"
                                name="type_of_vacation"
                                label="Тип отпуска"
                                value={formik.values.type_of_vacation}
                                onChange={formik.handleChange}
                                error={formik.touched.type_of_vacation && Boolean(formik.errors.type_of_vacation)}
                                helperText={formik.touched.type_of_vacation && formik.errors.type_of_vacation}
                                size="small"
                            />
                        </>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        <Button variant="outlined" color='primary.contrastText' type="submit" sx={{ width: "120px", height: "60px", border: "1px solid #D8D8D8", backgroundColor: "white" }}>
                            Создать
                        </Button>
                        <Button variant="outlined" color='primary.contrastText' sx={{ border: "1px solid #D8D8D8", backgroundColor: "white" }} onClick={handleClose}>
                            Отмена
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default MyModal;