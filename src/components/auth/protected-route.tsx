import { Navigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth0();

  // Show loading spinner while Auth0 is checking authentication status
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If user is not authenticated, redirect to sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // If user is authenticated, render the protected content
  return <>{children}</>;
}