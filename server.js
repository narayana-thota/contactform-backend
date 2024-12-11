require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB Connection
const uri = "mongodb+srv://narayanathota420:Narayana_420@cluster1.p4s9x.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster1";
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define Contact Schema and Model
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to the Contact Form API!");
});

// Endpoint to Handle Contact Form Submissions
app.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Create and save contact form submission
        const contact = new Contact({ name, email, message });
        await contact.save();

        res.status(201).json({ message: "Form submitted successfully!" });
    } catch (err) {
        console.error("Error saving contact form submission:", err);
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
