import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logoIcon from '/assets/images/logo.png';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const Logo: React.FunctionComponent = () => {
  const matches = useMediaQuery('(min-width:900px)');

  const router = useRouter();
  const redirectToHome = useCallback(() => {
    router && router.push('/');
  }, [router]);
  return (
    <Box onClick={() => redirectToHome()} sx={{ pt: 1.5 }}>
      <Image
        src={logoIcon}
        alt="logo"
        width={matches ? 100 : 60}
        height={matches ? 40 : 25}
      />
    </Box>
  );
};

export default Logo;
