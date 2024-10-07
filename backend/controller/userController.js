import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register
export const register = async (req, res) => {
  const { userId, username, password, role } = req.body;
  try {
    const newUser = new User({ userId, username, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Log user details only on successful authentication
    console.log('Authenticated User:', {
      id: user._id,
      username: user.username,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during login" });
  }
};


// get All Users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Get Single User
export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ userId: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error, "errrorrr");
    res
      .status(500)
      .json({ message: "something went wrong while retrieving the user" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { id } = req.params; // This is actually the userId
  const { username, password, role } = req.body;

  try {
    const updateFields = {};
    if (username) updateFields.username = username;
    if (role) updateFields.role = role;
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId: id }, // Use userId for finding the user
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "An error occurred while updating the user", error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ userId: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully", userId: id });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "An error occurred while deleting the user", error: error.message });
  }
};
