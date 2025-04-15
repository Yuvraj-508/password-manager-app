const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const admin = require("./service/firebaseadmin");
const { generateToken } = require("./service/auth");
const { checkAuth } = require("./middleware/auth");
const passwordEntry = require("./models/data");
const argon2 = require('argon2');

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

  // const isMatch = user.password === password; // Optionally: bcrypt compare
  // if (!isMatch) {
  //   return res.status(401).json({ message: "Invalid credentials" });
  // }

  const isMatch = await argon2.verify(user.password, password);
  if (!isMatch) return res.status(404).json({msg:'Incorrect password'});

  const token = generateToken(user);
  res.json({ token, user });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress;
    User.create({ username, email, password ,ip})
    .then((user) => {
      const token = generateToken(user);
      res.json({ user, token });
    })
    .catch((err) => res.status(400).send(err));
});


app.post("/passwords", checkAuth, async (req, res) => {
  const { platform, username, password, notes } = req.body;
  const userId = req.user._id;
  const newEntry = await passwordEntry.create({ userId, platform, username, password, notes });
  res.json(newEntry);
});
// Handle preflight requests
app.get("/passwords", checkAuth, async (req, res) => {
  const entries = await passwordEntry.find({ userId: req.user._id });
  res.json(entries);
});

// PUT /passwords/:id → Update a password entry
app.put("/passwords/:id", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, username, password, notes } = req.body;
    
    const updatedEntry = await passwordEntry.findByIdAndUpdate(
      id,
      { platform, username, password },
      { new: true } // Return updated doc
    );

    if (!updatedEntry) return res.status(404).json({ message: "Entry not found" });

    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: "Error updating password", error: err });
  }
});

app.delete("/passwords/:id", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEntry = await passwordEntry.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json({ message: "Password deleted successfully", deletedEntry });
  } catch (err) {
    res.status(500).json({ message: "Error deleting password", error: err });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
