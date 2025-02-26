const Complaint = require('../models/complaintModel');

//Create complaint
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
//Edit Complaint
exports.updateComplaint = async (req, res) => {
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            req.body,  // Takes the updated fields from request body
            { new: true, runValidators: true } // Returns updated document & ensures validation
        );

        if (!updatedComplaint) {
            console.log(`Complaint with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Complaint not found" });
        }

        console.log(`Complaint ID ${req.params.id} updated successfully`);
        res.status(200).json({ message: "Complaint updated successfully", complaint: updatedComplaint });
    } catch (error) {
        console.error(`Error updating complaint: ${error.message}`);
        res.status(500).json({ message: 'Error updating complaint', error: error.message });
    }
};
//Delete complaint
exports.deleteComplaint = async (req, res) => {
    try {
        const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);

        if (!deletedComplaint) {
            console.log(`Complaint with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Complaint not found" });
        }

        console.log(`Complaint ID ${req.params.id} deleted successfully`);
        res.status(200).json({ message: "Complaint deleted successfully" });
    } catch (error) {
        console.error(`Error deleting complaint: ${error.message}`);
        res.status(500).json({ message: 'Error deleting complaint', error: error.message });
    }
};
//Track all complaints
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();

        if (complaints.length === 0) {
            console.log("No complaints found");
            return res.status(404).json({ message: "No complaints found" });
        }

        console.log(`Total complaints found: ${complaints.length}`);
        res.status(200).json({ count: complaints.length, complaints });
    } catch (error) {
        console.error(`Error fetching complaints: ${error.message}`);
        res.status(500).json({ message: 'Error fetching complaints', error: error.message });
    }
};
// Track complaints by domain
exports.trackComplaintsByDomain = async (req, res) => {
    try {
        const complaints = await Complaint.find({ domain: req.params.domain });

        if (complaints.length > 0) {
            console.log(`Total complaints for domain ${req.params.domain}: ${complaints.length}`);

            res.status(200).json({
                count: complaints.length,
                complaints: complaints
            });
        } else {
            console.log(`No complaints found for domain: ${req.params.domain}`);
            res.status(404).json({ message: `No complaints found for domain: ${req.params.domain}` });
        }
    } catch (error) {
        console.error(`Error fetching complaints for domain ${req.params.domain}: ${error.message}`);
        res.status(500).json({ message: 'Error fetching complaints', error: error.message });
    }
};

