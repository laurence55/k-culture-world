import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const SignInPrompt = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: 'center',
        maxWidth: 600,
        mx: 'auto',
        my: 4,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Sign In Required
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Please sign in or create an account to continue with your booking.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button
          component={RouterLink}
          to="/signin"
          variant="contained"
          size="large"
          fullWidth
          sx={{ maxWidth: 200 }}
        >
          Sign In
        </Button>
        <Button
          component={RouterLink}
          to="/signup"
          variant="outlined"
          size="large"
          fullWidth
          sx={{ maxWidth: 200 }}
        >
          Sign Up
        </Button>
      </Stack>
    </Paper>
  );
};

export default SignInPrompt; 