import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login as loginService } from '../../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await loginService(username, password);
      login(token, user);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Login</Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {"Don't have an account? "}
            <Link href="/register" variant="body2">Sign Up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
