const { exec } = require('child_process');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// App setup
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cors()); // Enable CORS

// Start Local MongoDB
exec('mongod --dbpath /data/db --bind_ip_all', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting MongoDB: ${error.message}`);
    process.exit(1); // Exit if MongoDB fails to start
  }
  if (stderr) console.error(`MongoDB stderr: ${stderr}`);
  console.log(`MongoDB stdout: ${stdout}`);
});

// MongoDB connection
const mongoURI = 'mongodb://0.0.0.0:27017/narayana'; // Local MongoDB URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if the database connection fails
  });

// Define a schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Create a model
const Contact = mongoose.model('Contact', contactSchema);

// API to handle form submission
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

// Health Check Endpoint (optional)
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Start Express Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
