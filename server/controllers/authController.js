const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { sendOTPEmail } = require("../utils/sendEmail"); 

const generateAccessToken = (user) => jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET ,
    { expiresIn: '1d' }
);

const generateRefreshToken = (user) => jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
);
 // Assuming you have a utility function to send emails

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new user
        const user = await User.create({ name, email, password });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        const otpExpire = Date.now() + 3600000; // OTP expires in 1 hour

        // Save OTP and expiration time
        user.otp = otp;
        user.otpExpire = otpExpire;
        await user.save();

        // Send OTP to user's email
        await sendOTPEmail(user.email, otp);

        // Generate access and refresh tokens (as in your original code)
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Remove password from the user object before returning it
        const userObject = user.toObject();
        delete userObject.password;

        // Set cookies for tokens
        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'None', secure: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true });

        res.json({ message: 'Registered successfully. Please verify your email.', user: userObject });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(403).json({ message: 'Email not verified. Please verify your email first.' });
        }

        // Check password validity
        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Remove password from the user object before returning it
        const userObject = user.toObject();
        delete userObject.password;

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Set cookies for tokens
        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'None', secure: true  , maxAge: 1 * 24 * 60 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true  ,maxAge: 1 * 24 * 60 * 60 * 1000 });

        res.json({ message: 'Logged in successfully', user: userObject });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};


exports.logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};
exports.protectController = async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken; // Retrieve the token from cookies
  
      if (!accessToken) {
        return res.status(401).json({ message: 'No access token provided' });
      }
  
      // Verify the token
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      console.log("decoded", decoded); // Log the decoded payload for debugging
  
      // Token is valid, proceed with the response
      return res.json({ message: "Accessed route", userId: decoded.id });
    } catch (e) {
      console.error('Error verifying token:', e);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: 'No refresh token found' });
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const newAccessToken = generateAccessToken(user);
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'None' });
        res.json({ message: 'Access token refreshed' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token', error });
    }
};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL, // Replace with your email
        pass: process.env.EMAIL_APP_PASSWORD, // Replace with your email password or app password
    },
});

// Generate OTP
const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};



// Controller to verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log("email :", email);

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP exists and is valid
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check if OTP is expired
        if (Date.now() > user.otpExpire) {
            return res.status(400).json({ message: 'OTP expired. Please request a new OTP.' });
        }

        // Mark email as verified and clear OTP fields
        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();

        res.status(201).json({
            message: 'Email verified successfully',
            verified : true
         });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};
