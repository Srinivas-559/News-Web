import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, CircularProgress, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: '', password: '' });

    let valid = true;
    const newErrors = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      setIsLoading(false);
      return;
    }

    await login(email, password);
    setIsLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f7f9fc"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96"
        style={{ maxWidth: '400px' }}
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-[#1D3557]">
          Welcome Back
        </h1>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box mb={2}>
          {Object.values(errors).map((error, index) => (
            error && <p key={index} style={{ color: 'red', fontSize: '12px' }}>{error}</p>
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
          style={{
            backgroundColor: '#1D3557',
            color: 'white',
            padding: '10px 0',
            fontWeight: 'bold',
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <div className="mt-4 text-center">
          <p>Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link></p>
        </div>
      </form>
    </Box>
  );
};

export default Login;
