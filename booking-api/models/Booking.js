import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    
    },
    userEmail: {
      type: String,
     
      match: /.+\@.+\..+/, // Basic email format validation
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
      min: 1, // Ensure at least one guest
    },
    phone: {
      type: String, // Changed to String for flexibility in phone number format
      required: true,
      
    },
    bookAt: {
      type: Date,
      required: true,
      default: Date.now, // Automatically set the booking date if not provided
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
