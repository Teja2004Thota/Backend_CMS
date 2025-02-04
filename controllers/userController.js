const Complaint = require('../models/complaintModel');

exports.registerComplaint = async (req, res) => {
    const { userId, domain, priority, description } = req.body;

    try {
        const newComplaint = new Complaint({ userId, domain, priority, description });
        const savedComplaint = await newComplaint.save();

        console.log('Complaint registered successfully');

        res.status(201).json({ message: 'Complaint registered successfully' });
    } catch (error) {
        console.error(`Error registering complaint: ${error.message}`);
        res.status(500).json({
            message: 'Error registering complaint',
            error: error.message
        });
    }
};
//---------------------------------------------------------------------------
exports.getUserComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ userId: req.params.userId });

        if (complaints.length > 0) {
            console.log(`Complaints fetched for user id: ${req.params.userId}`);
            res.status(200).json(complaints);
        } else {
            console.log(`No complaints found for user id: ${req.params.userId}`);
            res.status(404).json({ message: `No complaints found for user id: ${req.params.userId}` });
        }
    } catch (error) {
        console.error(`Error fetching complaints: ${error.message}`);
        res.status(500).json({
            message: 'Error fetching complaints',
            error: error.message
        });
    }
};
