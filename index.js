// Import the required modules
const express = require('express'); // Express framework for building the server
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const dotenv = require('dotenv'); // dotenv to manage environment variables
const adminRoutes = require('./routes/adminRoutes'); // Routes for Admin-related actions
const subAdminRoutes = require('./routes/subAdminRoutes'); // Routes for SubAdmin-related actions
const userRoutes = require('./routes/userRoutes'); // Routes for User-related actions
const authRoutes= require('./routes/authRoutes');
const bodyParser=require('body-parser');

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Define the port to run the server on
const PORT = process.env.PORT || 4000; // Default to port 4000 if not provided in .env file

// Middleware to parse JSON data in incoming requests
app.use(express.json());

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI)  // Connect to MongoDB using the MONGO_URI from .env
    .then(() => console.log('MongoDB connected')) // Log success message if connected
    .catch((error) => console.log(error)); // Log error if connection fails

// Use routes for different user types
// Admin routes
app.use('/api/admin', adminRoutes);

// SubAdmin routes
app.use('/api/subadmin', subAdminRoutes);

// User routes
app.use('/api/user', userRoutes);


app.use (bodyParser.json());
// Register routes
app.use('/api/auth',authRoutes)


app.use('/',(req,res)=>{
    res.send("<h1>Welcome To CMS Portal</h1>")
})

// Start the Express server on the specified port
app.listen(PORT, () => {
    // Log a message indicating the server is running
    console.log(`Server is running at PORT:${PORT}`);
});


/*
                Key Points:
    Express: Handles HTTP requests and serves responses.
    Mongoose: Connects to MongoDB and handles data operations.
    dotenv: Keeps sensitive data like database URLs secure by loading them from a .env file.
*/