
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
        return res.status(401).json({ message: 'Not authorized, tokens missing' });
    }

    try {
        // Verify the access token
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        req.user = decodedAccessToken;
        next();
    } catch (accessTokenError) {
        if (accessTokenError.name === 'TokenExpiredError') {
            // Access token has expired, try to refresh it using the refresh token
            if (!refreshToken) {
                return res.status(401).json({ message: 'Access token expired, no refresh token provided' });
            }

            try {
                // Verify the refresh token
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                const user = await User.findById(decodedRefreshToken.id);

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Generate a new access token
                const newAccessToken = jwt.sign(
                    { id: user._id, role: user.role },
                    process.env.JWT_ACCESS_SECRET,
                    { expiresIn: '1d' }
                );

                // Set the new access token in the cookies
                res.cookie('accessToken', newAccessToken, { httpOnly: true, sameSite: 'None', secure: true });

                // Attach the user to the request object
                req.user = { id: user._id, role: user.role };
                next();
            } catch (refreshTokenError) {
                return res.status(401).json({ message: 'Invalid or expired refresh token', error: refreshTokenError });
            }
        } else {
            return res.status(401).json({ message: 'Invalid access token', error: accessTokenError });
        }
    }
};

exports.isAdmin = (req, res, next) => {
    console.log(req.user.role)
    if (req.user.role !== "admin") return res.status(403).json({ message: 'Not authorized as admin' });
    next();
};      
