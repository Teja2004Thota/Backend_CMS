const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all complaints
router.get('/complaints', adminController.getAllComplaints);

// Get complaint by ID
router.get('/complaints/:id', adminController.getComplaintById);

// Route to get complaints by domain
router.get('/complaints/domain/:domain', adminController.getComplaintByDomain);

// Update complaint
router.put('/complaints/:id', adminController.updateComplaint);

module.exports = router;
