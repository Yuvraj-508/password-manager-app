const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const admin = require("./service/firebaseadmin");
const { generateToken } = require("./service/auth");
const { checkAuth } = require("./middleware/auth");

dotenv.config();


// Apply CORS middleware globally
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", checkAuth, (req, res) => {
  res.json({ message: "welcome", user: req.user });
});

app.get("/dashboard", checkAuth, (req, res) => {
  res.json({ message: "Welcome, user", user: req.user });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = user.password === password; // Optionally: bcrypt compare
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);
  res.json({ token, user });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  User.create({ username, email, password ,ip})
    .then((user) => {
      const token = generateToken(user);
      res.json({ user, token });
    })
    .catch((err) => res.status(400).send(err));
});



// Handle preflight requests

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
