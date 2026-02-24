import { Token } from "../confit/token.js"
import userModle from "../modle/userModle.js";

export const auth = async(req, res) => {
    try {
        const {name, email} = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        let user = await userModle.findOne({email});
        if (!user) {
            user = await userModle.create({
                name,
                email
            });
        }

        // Generate token by passing userId
        const token = Token(user._id);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Better practice
            sameSite: "none", // Fixed typo
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Authentication successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Authentication failed",
            error: error.message
        });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
};