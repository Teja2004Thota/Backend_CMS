const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a complaint
router.post('/complaints', userController.registerComplaint);

// Get complaints by user
router.get('/complaints/:userId', userController.getUserComplaints);

module.exports = router;
