import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//user registratiom
export const register = async (req,res)=>{
    try{
        const salt= bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(req.body.password,salt)
        console.log(req.body)

        const newUser =new User({
         username:req.body.userName,
         email:req.body.email,
         password:hash,
         photo:req.body.photo
 
        })
        console.log(newUser.username)
        await newUser.save()
        res.status(200).json({success:true,message:"Successful",})
 
     }catch(err){
          console.error(err)
          res.status(500).json({success:false,message:"Failed to create. Try again"})
     }

}
    

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Incorrect email or password" });
        }

        const { password: userPassword, role, ...rest } = user._doc; // Access the correct document properties
        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: 'None', // Allows cross-site cookies
            expiresIn: token.expiresIn,
        }).status(200).json({ success: true, message: "Successfully logged in", data: { ...rest },role });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to log in" });
    }
};


