const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const e = require("express");
const { generateToken } = require("./service/auth");
const { checkAuth } = require("./middleware/auth");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", checkAuth, (req, res) => {
  res.json({message:"welcome",user:req.user});
});

app.get("/dashboard", checkAuth, (req, res) => {
  // Access user via req.user
  res.json({ message: "Welcome, user " ,user:req.user });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user);
  // Optionally: check password here
  const isMatch = user.password === password; // (or bcrypt compare)
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // ✅ User exists and password matches
  const token = generateToken(user); // Now user is guaranteed not null
  res.json({ token, user });

  // const user=new User({name,age});
  // User.create({ name, age })
  // .then(user => res.send(user))
  // .catch(err => res.status(400).send(err));
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  // res.send(user);
  // const user=new User({name,age});
  User.create({ username, email, password })
    .then((user) => {
      const token = generateToken(user);
      res.json({ user, token });
    })
    .catch((err) => res.status(400).send(err));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
