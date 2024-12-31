import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = [
  "https://tour-booking-frontend-gamma.vercel.app"

];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
// Database connection
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('MongoDB database connected to rough');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1);  // Exit the process if DB connection fails
    }
  };

// Middleware
app.use(express.json());

// Handle preflight (OPTIONS) requests


app.use(cookieParser());

// Routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

// Root route
app.get('/', (req, res) => {
    res.send('App is working');
});

// Start server
const startServer = async () => {
  await connect(); // Ensure database connection is established
  app.listen(port, () => {
    console.log(port);
  });
};

startServer();

