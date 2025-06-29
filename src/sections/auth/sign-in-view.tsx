import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

export function SignInView() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleAuth0Login = () => {
    loginWithRedirect({
      appState: {
        returnTo: '/',
      },
    });
  };

  // Show loading while Auth0 is checking authentication status
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Don't render the login form if user is already authenticated
  if (isAuthenticated) {
    return null;
  }

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={handleAuth0Login}
        sx={{
          py: 1.5,
          backgroundColor: '#4285f4',
          '&:hover': {
            backgroundColor: '#357ae8',
          },
        }}
      >
        Continue with Auth0
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Welcome to Botro Health</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
          }}
        >
          Log in to continue to the admin dashboard
        </Typography>
      </Box>
      {renderForm}
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
          mt: 3,
        }}
      >
        By continuing, you agree to Botro Health&apos;s{' '}
        <Link variant="caption" sx={{ textDecoration: 'underline' }}>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link variant="caption" sx={{ textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
      </Typography>
    </>
  );
}