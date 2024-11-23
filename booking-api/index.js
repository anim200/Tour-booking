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
const corsOptions = {
  origin: 'https://tour-booking-frontend-umber.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies or credentials
};
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
app.use(cors(corsOptions));
// Handle preflight (OPTIONS) requests
app.options('*', cors(corsOptions));

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

