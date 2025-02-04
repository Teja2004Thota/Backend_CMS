const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🚀 Protected Routes
router.get("/admin-dashboard", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ success: true, message: "Welcome Admin! This is your dashboard." });
});

router.get("/subadmin-dashboard", verifyToken, authorizeRoles("subadmin"), (req, res) => {
    res.json({ success: true, message: "Welcome SubAdmin! You can manage user complaints." });
});

router.get("/user-dashboard", verifyToken, authorizeRoles("user"), (req, res) => {
    res.json({ success: true, message: "Welcome User! You can register and track complaints." });
});

module.exports = router;
