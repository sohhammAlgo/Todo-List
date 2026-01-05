const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

// Load environment variables and connect to the database
dotenv.config();
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks',taskRoutes);

// Basic route to check server status
app.get('/',(req,res)=>{
    res.send("API is running...");
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});