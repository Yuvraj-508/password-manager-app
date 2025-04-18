const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dataRoute = require('./routes/data');
const userRoute = require('./routes/user');
const staticRoute = require('./routes/staticRouter');
const { checkAuth } = require("./middleware/auth"); // ✅ Correct

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user',userRoute);
app.use('/passwords',checkAuth,dataRoute);
app.use('/',checkAuth,staticRoute);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
