import { Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Logo = () => {
  const theme: any = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-building-store"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line
          x1="3"
          y1="21"
          x2="21"
          y2="21"
          color={theme.palette.secondary.main}
        ></line>
        <path
          d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"
          color={theme.palette.secondary.main}
        ></path>
        <line
          x1="5"
          y1="21"
          x2="5"
          y2="10.85"
          color={theme.palette.secondary.main}
        ></line>
        <line
          x1="19"
          y1="21"
          x2="19"
          y2="10.85"
          color={theme.palette.secondary.main}
        ></line>
        <path
          d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"
          color={theme.palette.secondary.main}
        ></path>
      </svg>
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.secondary.main,
          textDecoration: 'underline',
        }}
      >
        Bảo thư
      </Typography>
    </Stack>
  );
};

export default Logo;
