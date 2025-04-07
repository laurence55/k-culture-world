import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate email format
    if (!isValidEmail(email)) {
      return setError('Please enter a valid email address');
    }

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password should be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      console.log('Attempting to sign up with email:', email);
      await signup(email.trim(), password, displayName);
      navigate('/');
    } catch (error) {
      console.error('Signup error details:', error);
      if (error.code === 'auth/invalid-email') {
        setError('The email address is invalid. Please check and try again.');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please try logging in instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('The password is too weak. Please use a stronger password.');
      } else {
        setError(error.message || 'Failed to create an account');
      }
    }
    setLoading(false);
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create Account
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Display Name"
            type="text"
            fullWidth
            margin="normal"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={email !== '' && !isValidEmail(email)}
            helperText={email !== '' && !isValidEmail(email) ? 'Please enter a valid email address' : ''}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText="Password must be at least 6 characters"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            error={passwordConfirm !== '' && password !== passwordConfirm}
            helperText={passwordConfirm !== '' && password !== passwordConfirm ? 'Passwords do not match' : ''}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
} 