import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box , Link} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register as registerService } from '../../services/authService';

const Register = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role set to 'user'
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset any previous errors
    try {
      // Send userId, username, password, and role to the backend
      await registerService(userId, username, password, role); // Include userId
      navigate('/login'); // Navigate to login after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage('User already exists. Please login.');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userId"
            label="User ID"
            name="userId"
            autoComplete="userId"
            autoFocus
            value={userId}
            onChange={(e) => setUserId(e.target.value)} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            name="role"
            label="Role"
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)} // Allow users to input a role (optional)
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {"Already Login? "}
            <Link href="/login" variant="body2">Login here</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
