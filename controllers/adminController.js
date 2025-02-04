const Complaint = require('../models/complaintModel');

// Get all complaints (Admin)
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        const count = complaints.length;  // Count the number of complaints
    
        // Print the total count of complaints in VSCode terminal
        console.log(`Total number of complaints: ${count}`);
        
        // Send the count and complaints in the response
        res.status(200).json({ count, complaints });
    } catch (error) {
        // Log error details to VSCode terminal
        console.error(`Error fetching complaints: ${error.message}`);
    
        // Send the error message in the response for Postman
        res.status(500).json({ message: 'Error fetching complaints', error: error.message });
    }
};
// --------------------------------------------------------------
// Get complaint details by ID(Admin)
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            console.log("Complaint Not Found")
            return res.status(404).json({ message: "Complaint not found" });
            
        }
        res.status(200).json(complaint);
        console.log("Complaint Found")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get complaint details by domain(Admin)
exports.getComplaintByDomain = async (req, res) => {
    try {
        // Find complaints by domain (assuming domain is a field in your Complaint model)
        const complaints = await Complaint.find({ domain: req.params.domain });

        if (complaints.length === 0) {
            console.log("No complaints found for this domain");
            return res.status(404).json({ message: "No complaints found for this domain" });
        }

        const count = complaints.length;  // Count the number of complaints

        res.status(200).json({ count, complaints });
        console.log(`Complaints found for domain: ${req.params.domain}, Count: ${count}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//-----------------------------------------------------------------
// Update complaint details (Admin)
exports.updateComplaint = async (req, res) => {
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        res.status(200).json(updatedComplaint);
        console.log("Compaint updated")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
