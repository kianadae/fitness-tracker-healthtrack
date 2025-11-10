import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  ArrowBack as ArrowBackIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    
    try {
      // Replace with your actual API call
      // await api.post('/auth/reset-password', { 
      //   token, 
      //   email, 
      //   password, 
      //   password_confirmation: confirmPassword 
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <Container component="main" maxWidth="sm">
        <StyledPaper>
          <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
            Invalid or expired reset link. Please request a new password reset.
          </Alert>
          <Button
            component={Link}
            to="/forgot-password"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Request New Reset Link
          </Button>
        </StyledPaper>
      </Container>
    );
  }

  if (success) {
    return (
      <Container component="main" maxWidth="sm">
        <StyledPaper>
          <Box textAlign="center">
            <Box 
              component="img"
              src="/success-icon.svg" 
              alt="Success" 
              sx={{ 
                height: 80, 
                mb: 3,
                display: 'block',
                margin: '0 auto'
              }} 
            />
            
            <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
              Password Reset Successful!
            </Typography>
            
            <Typography color="textSecondary" paragraph>
              Your password has been successfully updated. You can now sign in with your new password.
            </Typography>
            
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Back to Sign In
            </Button>
          </Box>
        </StyledPaper>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ alignSelf: 'flex-start', mb: 2, textTransform: 'none' }}
        >
          Back
        </Button>
        
        <Box 
          component="img"
          src="/logo.svg" 
          alt="HealthTrack" 
          sx={{ 
            height: 60, 
            mb: 3,
            display: 'block',
            margin: '0 auto'
          }} 
        />
        
        <Typography component="h1" variant="h4" fontWeight={600} gutterBottom>
          Reset Your Password
        </Typography>
        
        <Typography color="textSecondary" align="center" mb={4}>
          Enter your new password below
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mb: 2, py: 1.5, borderRadius: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default ResetPassword;
