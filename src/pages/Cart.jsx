import { Container, Paper } from '@mui/material';
import CartTitle from 'components/cart/CartTitle';
import CartItems from 'components/cart/CartItems';

const Cart = () => {
    return (
        <Container disableGutters maxWidth="1788" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ backgroundColor: '#fff', p: { xs: 2, md: 3 }, mb: 2 }}>
                <CartTitle />
            </Paper>
            <Paper sx={{ backgroundColor: '#fff', p: { xs: 2, md: 3 } }}>
                <CartItems />
            </Paper>
        </Container>
    );
};

export default Cart;
