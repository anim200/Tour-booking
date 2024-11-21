import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'https://tour-booking-frontend-murex.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies or credentials
};

app.use(cors(corsOptions));

// Cookie Parser Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/tours', require('./routes/tours'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/review', require('./routes/reviews'));
app.use('/api/v1/booking', require('./routes/bookings'));

// Root route
app.get('/', (req, res) => {
    res.send('App is working very fine');
});

const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log('Server listening on port', port);
});

// Database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB database connected');
    } catch (err) {
        console.log(err);
    }
};

// Connect to database after server starts
app.on('listening', connect);
