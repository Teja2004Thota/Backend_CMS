const express = require('express');
const router = express.Router();
const subAdminController = require('../controllers/subAdminController');

// Get complaints by domain
router.get('/complaints/:domain', subAdminController.getComplaintsByDomain);

// Update complaint status
router.put('/complaints/:id/status', subAdminController.updateComplaintStatus);

module.exports = router;
