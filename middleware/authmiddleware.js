const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token from the header
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  try {
    // Verify the token and decode it to get the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Ensure that the decoded token contains the userId
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token structure' });
    }
    // Attach the decoded user info to req.user
    req.user = decoded;
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
module.exports = authMiddleware;