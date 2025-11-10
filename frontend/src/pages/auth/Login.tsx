import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  Alert, 
  IconButton, 
  InputAdornment,
  Divider,
  Stack
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Google,
  Facebook,
  Apple
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const SocialButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: '10px 16px',
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log in');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper>
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
          Welcome Back
        </Typography>
        
        <Typography color="textSecondary" align="center" mb={4}>
          Log in to your HealthTrack account to continue
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
            <Button 
              component={Link} 
              to="/forgot-password" 
              size="small" 
              color="primary"
            >
              Forgot password?
            </Button>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 2, mb: 3, py: 1.5, borderRadius: 2 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="textSecondary">OR CONTINUE WITH</Typography>
          </Divider>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
            <SocialButton fullWidth startIcon={<Google />}>
              Google
            </SocialButton>
            <SocialButton fullWidth startIcon={<Facebook />}>
              Facebook
            </SocialButton>
            <SocialButton fullWidth startIcon={<Apple />}>
              Apple
            </SocialButton>
          </Stack>

          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{' '}
              <Button 
                component={Link} 
                to="/register" 
                color="primary" 
                size="small"
                sx={{ textTransform: 'none' }}
              >
                Sign up
              </Button>
            </Typography>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Login;
