import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    
    try {
      // Replace with your actual API call
      // await api.post('/auth/forgot-password', { email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Password reset instructions have been sent to your email.');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

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
          Forgot Password
        </Typography>
        
        <Typography color="textSecondary" align="center" mb={4}>
          Enter your email and we'll send you instructions to reset your password
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
            {error}
          </Alert>
        )}

        {success ? (
          <Alert severity="success" sx={{ width: '100%', mb: 3 }}>
            {success}
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {loading ? <CircularProgress size={24} /> : 'Send Reset Instructions'}
            </Button>
          </Box>
        )}

        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            Remember your password?{' '}
            <Button 
              component={Link} 
              to="/login" 
              color="primary" 
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Sign in
            </Button>
          </Typography>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default ForgotPassword;
