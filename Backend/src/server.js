// Imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRouter from './routes/contactRoutes.js'; // Import routes

// Load .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verify the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Create an instance of express
const app = express();

// Use cors middleware
app.use(cors());

// Use express.json() to parse JSON bodies
app.use(express.json()); // This line is added to parse JSON request bodies

// Define the port to run the server on using an environment variable or default to 5173
const PORT = process.env.PORT || 5173;

// Use the router for /api routes
app.use('/api', contactRouter); // This line is added to use the contact routes

// Define a route for GET requests to the root URL ('/')
app.get('/', (req, res) => {
  // Send a response when this route is accessed
  res.send('Hello, world!');
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
