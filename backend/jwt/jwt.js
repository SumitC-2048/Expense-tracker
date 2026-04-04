import jwt from 'jsonwebtoken';

// here userId is email
const generateToken = (email) => {
    return jwt.sign(
        {id: email},
        process.env.JWT_SECRET,
        {expiresIn: "7d"} // 1 week
    )
}

export default generateToken;