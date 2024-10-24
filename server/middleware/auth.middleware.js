import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      // Pass the error to the next middleware with a proper message
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user by ID
    const user = await User.findById(decodedToken?._id).select('-password -refreshToken');

    if (!user) {
      return res.status(401).json({ message: 'Invalid Access Token' });
    }

    // Attach user info to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);

    // Send a 401 Unauthorized response if the token is invalid or an error occurs
    return res.status(401).json({ message: error?.message || 'Invalid Input' });
  }
};
