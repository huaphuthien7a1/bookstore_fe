import {
  Box,
  Container,
  Paper,
  Link,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LogoSection from '../LogoSection';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer = () => {
  const matches = useMediaQuery('(min-width:600px)');
  const theme: any = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e3f2fd',
      }}
    >
      <Box sx={{ backgroundColor: '#fff', p: 1, mt: 2 }}>
        <Box textAlign="center" mt={2}>
          <LogoSection />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={matches ? 5 : 8}
            color="inherit"
            mt={3}
            mb={2}
          >
            <Stack
              direction={matches ? 'row' : 'column'}
              spacing={matches ? 5 : 1}
            >
              <Link href="#" variant="h4" color="inherit" underline="none">
                Dịch Vụ
              </Link>
              <Link href="#" variant="h4" color="inherit" underline="none">
                Hỗ Trợ
              </Link>
            </Stack>
            <Stack
              direction={matches ? 'row' : 'column'}
              spacing={matches ? 5 : 1}
            >
              <Link
                href="/policy"
                variant="h4"
                color="inherit"
                underline="none"
              >
                Chính Sách
              </Link>
              <Link
                href="/contact-us"
                variant="h4"
                color="inherit"
                underline="none"
              >
                Liên Hệ
              </Link>
            </Stack>
            <Stack
              direction={matches ? 'row' : 'column'}
              spacing={matches ? 5 : 1}
            >
              <Link
                href="/about-us"
                variant="h4"
                color="inherit"
                underline="none"
              >
                Giới thiệu
              </Link>
              <Link
                href="/profile"
                variant="h4"
                color="inherit"
                underline="none"
              >
                Tài Khoản
              </Link>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={4} margin={1}>
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box textAlign="center" pt={{ xs: 1, sm: 2 }} pb={{ xs: 2, sm: 0 }}>
          <Typography color={theme.palette.info}>
            &reg; {new Date().getFullYear()} Bản quyền thuộc về Công ty TNHH
            BOXO
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
