require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Models
const User = require('./models/User');

const Book = require('./models/Book');

// Routes
app.get('/', (req, res) => res.send('API Server Running'));

// User Routes
app.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email, password });
    console.log(req.body, "===============", user);
    if (user) {
      res.json({ success: true, message: 'Login successful', user, token: "this is fake toke" });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error logging in', error: err.message });
  }
});

// Book Routes
app.get('/books/top', async (req, res) => {
  try {
    const books = await Book.find().sort({ rating: -1 }).limit(10);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching top books', error: err.message });
  }
});

app.get('/books/recent', async (req, res) => {
  try {
    const books = await Book.find().sort({ readers: -1 }).limit(10);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recently read books', error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
