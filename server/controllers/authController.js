const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, manager_id } = req.body;

    // Validate manager_id
    let validManagerId = null;
    if (manager_id && !mongoose.Types.ObjectId.isValid(manager_id)) {
      return res.status(400).json({ error: 'Invalid manager ID' });
    }
    
    // Set manager_id to null if not provided or invalid
    if (manager_id) {
      validManagerId = manager_id;
    }

    // Create the user
    const user = new User({ name, email, password, role, manager_id: validManagerId });
    
    // Save the user
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
   
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id, role: user.role, manager_id: user.manager_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
