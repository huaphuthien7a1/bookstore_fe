import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from 'store/snackbarReducer';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbar = () => {
    const dispatch = useDispatch();
    const openSnackbar = useSelector((state) => state.snackbar.open);
    const messageSnackbar = useSelector((state) => state.snackbar.message);
    const typeSnackbar = useSelector((state) => state.snackbar.type);
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={() => {
                dispatch(closeSnackbar());
            }}
        >
            <Alert
                onClose={() => {
                    dispatch(closeSnackbar());
                }}
                severity={typeSnackbar || 'success'}
                sx={{ width: '100%' }}
            >
                {messageSnackbar}
            </Alert>
        </Snackbar>
    );
};

export default CustomizedSnackbar;
