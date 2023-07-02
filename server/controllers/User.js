const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    message: "User Welcome",
  });
});

// create user
router.post("/register", async (req, res) => {
  const { username, email } = req.body;

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(200).json({ message: "Username or email already exists" });
    }

    const newUser = new User({
      ...req.body,
    });

    await newUser.save();
    res.status(201).json({ message: "Created Successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//edit user
router.post("/login", async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    // Find the user document using email or userName
    const user = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password
    if (password !== user.password) {
      return res.status(200).json({ message: "Invalid password" });
    }

    // Login successful
    return res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "Internal server error" });
  }
});

module.exports = router;
