const jwt = require('jsonwebtoken');
require('dotenv').config(); 

// Middleware to verify JWT token and extract user details
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied! No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
        req.user = verified; // Attach user info (userId, role, etc.) to request
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid Token!" });
    }
};

// Role-based access control (RBAC) middleware
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Forbidden! You do not have permission." });
        }
        next();
    };
};

module.exports = { verifyToken, authorizeRoles };
