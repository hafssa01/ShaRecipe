import express from 'express';
import cors from 'cors';
import RecipeRoutes from './server/src/Routes/recipe.js'; // Adjust path if necessary
import AuthRoutes from './server/src/Routes/auth.js'; // Import your Auth routes

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Root Route 
app.get('/', (req, res) => res.send('<h1>Hello Express</h1>'));

// API Routes
app.use('/api/recipes', RecipeRoutes);
app.use('/api/auth', AuthRoutes); // Add this line for auth routes

// Error Handling Middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});
