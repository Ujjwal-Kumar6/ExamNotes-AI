import jwt from "jsonwebtoken";

const isLoging = (req, res, next) => {
    try {
        const token = req.cookies.token; // Access the specific cookie
        
        if (!token) {
            return res.status(401).json({
                message: 'You are not logged in. Please login to access this resource'
            });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_PASS);
        
        if (!verifyToken) {
            return res.status(401).json({
                message: 'Invalid or expired token'
            });
        }

        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        console.log(error);
        
        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token has expired. Please login again'
            });
        }
        
        return res.status(500).json({
            message: 'Authentication error',
            error: error.message
        });
    }
};

export default isLoging;