const Complaint = require('../models/complaintModel');

// Get complaints by domain (Sub Admin)
exports.getComplaintsByDomain = async (req, res) => {
    try {
        const complaints = await Complaint.find({ domain: req.params.domain });
    
        if (complaints && complaints.length > 0) {
            const complaintCount = complaints.length;
    
            console.log(`Total complaints for domain ${req.params.domain}: ${complaintCount}`);
    
            res.status(200).json({
                count: complaintCount,
                complaints: complaints
            });
        } else {
            res.status(404).json({ message: `No complaints found for domain: ${req.params.domain}` });
            console.log("No complaints Found")
        }
    } catch (error) {
        console.error(`Error fetching complaints for domain ${req.params.domain}: ${error.message}`);
        res.status(500).json({ message: 'Error fetching complaints', error: error.message });
    }
    
};

// Get complaint by ID
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (complaint) {
            console.log(`Complaint found with ID: ${req.params.id}`);

            res.status(200).json({
                complaint: complaint
            });
        } else {
            res.status(404).json({ message: `No complaint found with ID: ${req.params.id}` });
            console.log(`No complaint found with ID: ${req.params.id}`);
        }
    } catch (error) {
        console.error(`Error fetching complaint with ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Error fetching complaint', error: error.message });
    }
};

//--------------------------------------------------------------------------------------------------
// Update complaint status (Sub Admin)
exports.updateComplaintStatus = async (req, res) => {
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                userId:req.body.userId,
                status: req.body.status,
                description: req.body.description, // Update description
                priority: req.body.priority,         // Update priority
                domain: req.body.domain              // Update domain
            },
            { new: true } // Ensures the updated document is returned
        );
    
        if (!updatedComplaint) {
            console.log(`Complaint with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Complaint not found" });
        }
    
        console.log(`Complaint ID ${req.params.id} updated with new details`);
        res.status(200).json({ message: "Complaint updated", complaint: updatedComplaint });
    } catch (error) {
        console.error(`Error updating complaint: ${error.message}`);
        res.status(500).json({ message: 'Error updating complaint', error: error.message });
    }
    
};
