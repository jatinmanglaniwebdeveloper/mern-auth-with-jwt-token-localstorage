// middleware/authMiddleware.js
module.exports = (req, res, next) => {
    const { role } = req.user; // Assuming JWT middleware has set req.user
  
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Access Denied' });
    }
    next();
  };
  