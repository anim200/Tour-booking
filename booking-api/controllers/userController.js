import User from "../models/User.js"

export const createUser = async (req, res) => {
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save();
        res.status(200).json({success: true, message: "User created successfully", data: savedUser})
    } catch (err) {
        res.status(400).json({success: false, message: "Failed to create. Try again"})
    }
}

// Update user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new: true})
        res.status(200).json({success: true, message: "Successfully updated", data: updatedUser})
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to update"})
    }
}

// Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Successfully deleted"})
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to delete"})
    }
}

// Get single user
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        res.status(200).json({success: true, message: "Successfully fetched single user", data: user})
    } catch (error) {
        res.status(404).json({success: false, message: "Not found"})
    }
}

// Get all users
export const getAllUsers = async (req, res) => {


    try {
        const users = await User.find({})
        res.status(200).json({success: true, message: "Successfully fetched all users", data: users})
    } catch (error) {
        res.status(404).json({success: false, message: "Not found"})
    }
}
