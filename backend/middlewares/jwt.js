import jwt from 'jsonwebtoken';
import User from '../models/users.js'

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findOne({email: decoded.id});
            
            next();
        }
        catch (error) {
            const expired = error?.name === "TokenExpiredError";
            return res.status(401).json({
                success: false,
                message: expired
                    ? "Session expired. Please sign in again."
                    : "Not authorized, token invalid or missing.",
            });
        }

    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token. Please sign in.",
        });
    }

}

export default protect;