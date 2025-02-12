import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { parse } from 'date-fns';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

    const user = localStorage.getItem('user');
    console.log("user ", user);
    const parsedUser = JSON.parse(user);
    console.log("Parsed user :" ,parsedUser);
  const email = parsedUser.user.email;
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    // Validation check
    if (!otp) {
      setError('Please enter the OTP');
      setIsLoading(false);
      return;
    }

    // Send email and OTP to the backend for verification
    try {
      const response = await fetch('http://localhost:5005/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

        const data = await response.json();
        console.log(data);
        console.log(data.status);
        if (data.verified){
        setSuccess(true);
        setIsLoading(false);
        toast.success('Email verified successfully!', {
          position: "top-right", 
          autoClose: 3000, 
          hideProgressBar: false, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true, 
          progress: undefined,
        });

        setTimeout(() => {
          navigate('/login'); // Use navigate to redirect to the login
        }, 3000); // Wait for the toast to show before redirect
      } else {
        setError(data.message || 'Failed to verify OTP');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Error verifying OTP');
      setIsLoading(false);
    }
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
        onSubmit={handleVerify}
        className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96"
        style={{ maxWidth: '400px' }}
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-[#1D3557]">
         OTP Sent to the email , Please enter here 
        </h1>

        <TextField
          label="Enter OTP"
          variant="outlined"
          fullWidth
          className="mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          error={!!error}
          helperText={error}
          margin="normal"
        />

        {/* Error or success message */}
        {success && (
          <p style={{ color: 'green', fontSize: '14px', textAlign: 'center' }}>
            OTP verified successfully!
          </p>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
          style={{
            backgroundColor: '#1D3557', // Dark Blue
            color: 'white',
            padding: '10px 0',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
        </Button>
      </form>
    </Box>
  );
};

export default VerifyOTP;
