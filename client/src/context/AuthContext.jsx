import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // 
import { TroubleshootTwoTone } from '@mui/icons-material';
import { TbLogout } from "react-icons/tb";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Rehydrate user from localStorage on page reload
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if ( storedUser ) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("stored user name" , parsedUser.name)
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5005/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
  
      // Check if email is verified
      if (!data.user.isEmailVerified) {
        // Show a toast message prompting the user to verify their email
        toast.error('😔 Please verify your email and try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return; // Do not proceed with the login if the email is not verified
      }
  
      setUser(data.user);
      console.log("response:", data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsAuthenticated(true);
      toast.success('😄 Logged in !', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error('Login failed', error.response?.data?.message || error.message);
      toast.error('😔 Login failed. Please check your credentials.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  
  
  
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5005/api/auth/signup', { name, email, password }, {
        withCredentials:true
      });
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/verifyOTP');
    } catch (error) {
      console.error('Registration failed', error.response?.data?.message || error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5005/api/auth/logout');
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      toast('👋 Logged out', {
                position: "top-right", 
                autoClose: 3000, 
                hideProgressBar: true, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined,
              });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error.response?.data?.message || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

