import jwt from "jsonwebtoken";

export const Token = (userId) => {
    try {
        const token = jwt.sign(
            { userId }, 
            process.env.JWT_PASS,
            { expiresIn: "7d" }
        );
        return token;
    } catch (error) {
        console.log(error);
        throw new Error("Token generation failed");
    }
};