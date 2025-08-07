const User = require('../models/User');
const Order = require('../models/Order');
const Prescription = require('../models/Prescription');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// regristration des utilisateurs en reseignant le role
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



// login des utilisateur et génération des tokken de refresh et access
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
      { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '5d' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d' }
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



// refresh tokken
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
    const { page = 1, limit = 5, search = '', sort = 'asc', role = '' } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select('-password -refreshToken -medicalHistory -allergies')
      .skip((page - 1) * limit)
      .limit(limit);
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


// Delete a user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// patch for update profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, address, role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, address, role },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// récuperation des commandes passée par un certain utisateur
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// voir la liste des precriprion qu'un certain utilisateurs a reçu d'un médecin
exports.getUserPrescriptions = async (req, res) => {
  try {
    const userId = req.params.id;
    const prescriptions = await Prescription.find({ patient: userId })
      .populate('doctor', '_id email firstName lastName');
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
