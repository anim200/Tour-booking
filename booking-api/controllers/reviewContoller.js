import Tour from "../models/Tour.js";
import Review from "../models/Review.js"; // Corrected import

export const createReview = async (req, res) => {
    const tourId = req.params.id;
    console.log(tourId)
    const newReview = new Review({ ...req.body });

    try {
        const savedReview = await newReview.save();
        
        // Check if the tour exists
        const updatedTour = await Tour.findByIdAndUpdate(
            tourId,
            { $push: { reviews: savedReview._id } },
            { new: true } // Return the updated document
        );

        if (!updatedTour) {
            return res.status(404).json({ success: false, message: "Tour not found" });
        }

        res.status(200).json({ success: true, message: "Review submitted", data: savedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to submit review" });
    }
};
