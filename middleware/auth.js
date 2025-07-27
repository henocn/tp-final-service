const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Vérifier si le token est présent
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier si l'utilisateur existe toujours
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    // Ajouter l'utilisateur à la requête
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
