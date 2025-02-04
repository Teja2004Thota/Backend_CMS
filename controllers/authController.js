const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/authModel');
require('dotenv').config(); // Load environment variables

// Register User
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // Allowed roles
    const allowedRoles = ["admin", "subadmin", "user"];
    if (!allowedRoles.includes(role.toLowerCase())) {
        return res.status(400).json({ success: false, message: "Invalid role! Choose from admin, subadmin, or user." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User with this email already exists!");
            return res.status(400).json({ success: false, message: "Email already in use!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role.toLowerCase() // Store role in lowercase for consistency
        });

        await newUser.save();

        console.log("✅ User Registered:", email, "Role:", role);
        res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        console.error("❌ Error registering user:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Login User (Role is automatically determined)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required!" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials!" });
        }

        // Role is fetched automatically from the database
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'default_secret_key',
            { expiresIn: '1h' }
        );

        console.log(`✅ ${user.role.toUpperCase()} Logged In:`, email);
        res.status(200).json({ 
            success: true, 
            message: `${user.role.toUpperCase()} Login successful!`, 
            token, 
            role: user.role  // Send role in response
        });

    } catch (error) {
        console.error("❌ Error logging in:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = { registerUser, loginUser };
