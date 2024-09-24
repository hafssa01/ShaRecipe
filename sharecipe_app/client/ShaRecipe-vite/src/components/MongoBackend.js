import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas Connection
const mongoURI = 'mongodb+srv://amatuallah:prhN0JidHD0V84d0@cluster0.wvlba.mongodb.net/';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// User schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', { email, password }); // Debugging log

  // Find the user in MongoDB
  try {
    const user = await User.findOne({ email });

    if (user) {
      // Verify password (since you're storing passwords as plain text for now)
      if (user.password === password) {
         // Respond with a mock token for successful login
         res.status(200).json({ token: 'mockToken123', message: 'Login successful!' });
    } else {
      // Respond with an error if login fails
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    // Respond with an error if user not found
    res.status(401).json({ message: 'Invalid credentials' });
   }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
