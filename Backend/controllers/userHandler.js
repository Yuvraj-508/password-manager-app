const User = require("../models/user");
const argon2 = require('argon2');
const {generateToken} =require('../service/auth')


async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await argon2.verify(user.password, password);
  if (!isMatch) return res.status(404).json({ msg: "Incorrect password" });

  const token = generateToken(user);
  res.json({ token, user });
}


async function handleRegister(req, res) {
  const { username, email, password } = req.body;
  const forwarded = req.headers['x-forwarded-for'];
  let ip = forwarded ? forwarded.split(",")[0].trim() : req.socket.remoteAddress;
  
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    ip = '127.0.0.1';
  }
  
  console.log("Client IP:", ip);
  
  
  
  
  User.create({ username, email, password, ip })
    .then((user) => {
      const token = generateToken(user);
      res.json({ user, token });
    })
    .catch((err) => res.status(400).send(err));
}

module.exports = {
  handleRegister,
  handleLogin,
};
