require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const User = require('./models/User');

const users = [
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123', // Saved as plain text
      fullName: 'John Doe',
      bio: 'Avid book reader.',
    },
    {
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'mypassword', // Saved as plain text
      fullName: 'Jane Doe',
      bio: 'Loves historical fiction.',
    },
  ];
  ;

const books = [
    {
      title: 'The Great Gatsby',
      cover: 'https://dummyimage.com/200x300/000/fff&text=The+Great+Gatsby',
      banner: 'https://dummyimage.com/1200x400/000/fff&text=The+Great+Gatsby+Banner',
      rating: 4.5,
      readers: 1200,
      genres: ['Classic', 'Fiction'],
      chapters: 20,
    },
    {
      title: 'To Kill a Mockingbird',
      cover: 'https://dummyimage.com/200x300/000/fff&text=To+Kill+a+Mockingbird',
      banner: 'https://dummyimage.com/1200x400/000/fff&text=To+Kill+a+Mockingbird+Banner',
      rating: 4.8,
      readers: 1500,
      genres: ['Fiction', 'Historical'],
      chapters: 25,
    },
    {
      title: '1984',
      cover: 'https://dummyimage.com/200x300/000/fff&text=1984',
      banner: 'https://dummyimage.com/1200x400/000/fff&text=1984+Banner',
      rating: 4.7,
      readers: 2000,
      genres: ['Dystopian', 'Science Fiction'],
      chapters: 30,
    },
    // Add more books here
  ];
  

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('MongoDB connected');
    
    // await Book.deleteMany(); // Clear existing data
    // await User.deleteMany();
    
    await Book.insertMany(books);
    await User.insertMany(users);
    
    console.log('Dummy data added');
    process.exit();
  })
  .catch((err) => console.error('MongoDB connection error:', err));
