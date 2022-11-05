import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from 'assets/images/icons/social-google.svg';
import config from 'config';
import { forgotPassword, login } from 'apis/auth.api';
import authService from 'services/authService';
import { useNavigate } from 'react-router';

const ForgotPasswordForm = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showAlert, setShowAlert] = useState(false);

    return (
        <>
            <Formik
                initialValues={{
                    email: '',

                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Email phải đúng định dạng').max(255, 'Email tối đa 255 ký tự').required('Email là bắt buộc')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const req = { email: values.email };
                        const res = await forgotPassword(req);
                        setShowAlert(true);
                        setStatus({ success: true });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);

                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Gửi email
                                </Button>
                            </AnimateButton>
                            {showAlert && (
                                <Alert sx={{ marginTop: 2 }} severity="success" color="info" onClose={() => setShowAlert((i) => !i)}>
                                    Vui lòng kiểm tra Email để nhận đường dẫn xác thực
                                </Alert>
                            )}
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default ForgotPasswordForm;
