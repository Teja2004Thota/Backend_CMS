const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a complaint POST
router.post('/register', userController.registerComplaint);
//Edit complaint
router.put('/update/:id', userController.updateComplaint);
//delete complaint
router.delete('/delete/:id', userController.deleteComplaint);
//track all complaints
router.get('/all', userController.getAllComplaints);
// track complaints by domain
router.get('/domain', userController.trackComplaintsByDomain);


module.exports = router;
