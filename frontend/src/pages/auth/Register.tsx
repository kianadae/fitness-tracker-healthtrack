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
  Checkbox,
  FormControlLabel,
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
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const { name, email, password, confirmPassword } = formData;
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!acceptedTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
          Create an Account
        </Typography>
        
        <Typography color="textSecondary" align="center" mb={4}>
          Join HealthTrack and start tracking your fitness journey
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
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
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox 
                value="acceptTerms" 
                color="primary"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <Button 
                  component="a" 
                  href="/terms" 
                  color="primary" 
                  size="small"
                  sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
                >
                  Terms of Service
                </Button>{' '}
                and{' '}
                <Button 
                  component="a" 
                  href="/privacy" 
                  color="primary" 
                  size="small"
                  sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
                >
                  Privacy Policy
                </Button>
              </Typography>
            }
            sx={{ mt: 1, mb: 2, alignItems: 'flex-start' }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 1, mb: 3, py: 1.5, borderRadius: 2 }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="textSecondary">OR SIGN UP WITH</Typography>
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
              Already have an account?{' '}
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
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Register;
