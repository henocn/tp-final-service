const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.register = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      ...rest,
      email, 
      password: hashedPassword 
    });
    res.status(201).json({ 
      message: 'User created',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        address: user.address
    }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    // Envoyer les tokens
    res.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email, 
        role: user.role,
        address: user.address,
        accessToken: accessToken,
        refreshToken: user.refreshToken
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    res.json({
      accessToken,
      expiresIn: 900
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};



// Get all users in database
exports.getAllUsers = async(req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken -medicalHistory -allergies');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get a user details
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -refreshToken');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};