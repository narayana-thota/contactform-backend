<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all domains
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB Connection
const uri = process.env.MONGODB_URI;  // Use the environment variable for MongoDB URI
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define Contact Schema and Model
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }, // New phone number field
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
=======
// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debugging: Log the MongoDB URI
console.log('MONGO_URI:', process.env.MONGO_URI);

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/narayana'; // Use environment variable or default to local MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if connection fails
  });

// Define a schema and model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
>>>>>>> be6e2b744df1740a20b525ad7fb24ff739f81992
});

const Contact = mongoose.model('Contact', contactSchema);

<<<<<<< HEAD
// Routes
app.get('/', (req, res) => {
    res.send("Welcome to the Contact Form API!");
});

// Endpoint to Handle Contact Form Submissions (Updated to match frontend URL)
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate input
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Create and save contact form submission
        const contact = new Contact({ name, email, phone, message });
        await contact.save();

        res.status(201).json({ success: true, message: "Form submitted successfully!" });
    } catch (err) {
        console.error("Error saving contact form submission:", err);
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
=======
// API route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Optional health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
>>>>>>> be6e2b744df1740a20b525ad7fb24ff739f81992
});
