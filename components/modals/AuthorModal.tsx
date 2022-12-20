import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  useTheme,
  Alert,
  Button,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState, FC } from 'react';
import CustomModal from './CustomModal';
import objectEquals from '../../common/objectEquals';
import ConfirmModal from './ConfirmModal';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '../../store/snackbarReducer';
import { createAuthor, editAuthor } from '../../apis/author.api';
import createRequest from '../../common/createRequest';
import { IModal } from '@/interfaces/compontents/modal.interface';

const AuthorModal: FC<IModal> = ({
  handleClose,
  open,
  currentProduct,
  refetchAfterClose,
}) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState<any>(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const data = currentProduct?.data;

  const initialValues = {
    name: data?.name ? data?.name : '',
    bio: data?.bio ? data?.bio : '',
    address: data?.address ? data?.address : '',
    phone: data?.phone ? data?.phone : '',
    email: data?.email ? data?.email : '',
    submit: null,
  };
  const handleExit = (currentValues: any) => {
    if (objectEquals(initialValues, currentValues)) {
      handleClose();
    } else {
      setShowConfirm(true);
    }
  };
  const toast = ({ type, message }: { type: string; message: string }) => {
    dispatch(toggleSnackbar({ open: true, message, type }));
  };
  return open ? (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(255, 'Tên tác giả tối đa 255 ký tự')
            .required('Tên tác giả là bắt buộc'),
          bio: Yup.string().max(255, 'Tiểu sử tác giả tối đa 255 ký tự'),
          address: Yup.string().max(255, 'Địa chỉ tác giả tối đa 255 ký tự'),
          phone: Yup.string().max(
            255,
            'Số điện thoại tác giả tối đa 255 ký tự'
          ),
          email: Yup.string()
            .email('Email phải đúng định dạng')
            .max(255, 'Email tác giả tối đa 255 ký tự'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const req = createRequest({
              name: values.name,
              bio: values.bio,
              address: values.address,
              phone: values.phone,
              email: values.email,
            });
            if (data === null) {
              await createAuthor(req);
            } else {
              await editAuthor(data?.id, req);
            }
            setStatus({ success: true });
            setSubmitting(false);
            toast({
              type: 'success',
              message: `${data === null ? 'Tạo' : 'Cập nhật'} thành công`,
            });
            refetchAfterClose();
            setTimeout(() => {
              handleClose();
            }, 1000);
          } catch (err) {
            console.error(err);
            toast({
              type: 'error',
              message: `Xảy ra lỗi trong quá trình ${
                data === null ? 'tạo' : 'cập nhật'
              } thể tác giả`,
            });
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <CustomModal
            open={open}
            handleClose={() => {
              handleExit(values);
            }}
            title={data === null ? 'Tạo tác giả' : 'Chỉnh sửa tác giả'}
          >
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-name">
                  Tên tác giả
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Tên tác giả"
                  inputProps={{}}
                />
                {touched.name && errors.name && (
                  <FormHelperText error id="standard-weight-helper-text-name">
                    {errors.name as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.bio && errors.bio)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-bio">
                  Tiểu sử tác giả
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-bio"
                  type="text"
                  value={values.bio}
                  name="bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Tiểu sử tác giả"
                  inputProps={{}}
                />
                {touched.bio && errors.bio && (
                  <FormHelperText error id="standard-weight-helper-text-bio">
                    {errors.bio as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.address && errors.address)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-address">
                  Địa chỉ tác giả
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-address"
                  type="text"
                  value={values.address}
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Địa chỉ tác giả"
                  inputProps={{}}
                />
                {touched.address && errors.address && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-address"
                  >
                    {errors.address as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.phone && errors.phone)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-phone">
                  Số điện thoại tác giả
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-phone"
                  type="text"
                  value={values.phone}
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Số điện thoại tác giả"
                  inputProps={{}}
                />
                {touched.phone && errors.phone && (
                  <FormHelperText error id="standard-weight-helper-text-phone">
                    {errors.phone as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email">
                  Email tác giả
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email tác giả"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email">
                    {errors.email as any}
                  </FormHelperText>
                )}
              </FormControl>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {data === null ? 'Tạo' : 'Lưu'}
                </Button>
                {!!showAlert && (
                  <Alert
                    sx={{ marginTop: 2 }}
                    severity={showAlert?.type.toString()}
                    color={
                      showAlert?.type.toString() === 'success'
                        ? 'info'
                        : showAlert?.type.toString()
                    }
                    onClose={() => setShowAlert(null)}
                  >
                    {showAlert?.content}
                  </Alert>
                )}
              </Box>
            </form>
          </CustomModal>
        )}
      </Formik>
      <ConfirmModal
        open={showConfirm}
        handleClose={() => {
          setShowConfirm(false);
        }}
        handleConfirm={() => {
          setShowConfirm(false);
          handleClose();
        }}
      />
    </>
  ) : null;
};

export default AuthorModal;
