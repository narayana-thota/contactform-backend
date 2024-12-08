const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// App setup
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/narayana', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a model
const Contact = mongoose.model('Contact', contactSchema);

// API to handle form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
