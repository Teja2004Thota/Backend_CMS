const mongoose = require('mongoose');

// Define a Complaint Schema
const complaintSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    domain: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'Pending' 
    },
    priority: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SubAdmin' 
    }
});

// Create a Complaint model based on the schema
const Complaint = mongoose.model('Complaint', complaintSchema);//Database Name

module.exports = Complaint;
