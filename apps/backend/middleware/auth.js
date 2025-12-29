// Simple authentication middleware
// In production, you should use proper JWT tokens or session management

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Authorization header required'
    });
  }
  
  // For now, we'll use a simple token check
  // In production, implement proper JWT verification
  const token = authHeader.split(' ')[1]; // Bearer <token>
  
  if (token === 'admin-token-123') {
    req.user = { id: 1, role: 'admin' };
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

module.exports = { authenticate };