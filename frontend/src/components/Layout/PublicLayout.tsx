import { Box, Container, CssBaseline, Typography, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const PublicLayout = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Left side - Branding/Illustration (hidden on mobile) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: 1,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          backgroundImage: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
        }}
      >
        <Box sx={{ maxWidth: 500, textAlign: 'center' }}>
          <Box
            component="img"
            src="/pulse.png"
            alt="HealthTrack"
            sx={{ height: 60, mb: 3 }}
          />
          <Typography variant="h3" component="h1" fontWeight={600} gutterBottom>
            Track Your Fitness Journey
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Join thousands of users achieving their fitness goals with our comprehensive tracking platform.
          </Typography>
          <Box
            component="img"
            src="/watch.png"
            alt="Fitness tracking"
            sx={{ maxWidth: '100%', height: 'auto', mt: 4 }}
          />
        </Box>
      </Box>
      
      {/* Right side - Auth Forms */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
          backgroundColor: theme.palette.background.paper,
          [theme.breakpoints.up('md')]: {
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        <StyledContainer maxWidth="sm">
          <Outlet />
        </StyledContainer>
      </Box>
    </Box>
  );
};

export default PublicLayout;
