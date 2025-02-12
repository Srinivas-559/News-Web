const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.info("cookies ",req.cookies);
    if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized as admin' });
    next();
};      
