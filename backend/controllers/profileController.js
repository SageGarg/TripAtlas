const User = require("../models/User");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error('Get Profile Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const updateFields = ['firstName', 'lastName', 'phoneNumber', 'bio', 'preferences'];
    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'preferences') {
          user.preferences = {
            ...user.preferences,
            ...req.body.preferences
          };
        } else {
          user[field] = req.body[field];
        }
      }
    });

    await user.save();
    const updatedUser = await User.findById(user._id).select('-passwordHash');
    res.json(updatedUser);
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await user.deleteOne();
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error('Delete Profile Error:', err);
    res.status(500).json({ error: err.message });
  }
}; 