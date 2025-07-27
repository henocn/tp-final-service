module.exports = (roleRequired) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (req.user.role !== roleRequired && req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: `Access denied. ${roleRequired} role required.` 
      });
    }

    next();
  };
};
