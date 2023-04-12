const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require("./config/database");

const usersRouter = require('./routes/users');
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
// require("./config/passport")(passport);

//Connect To Database
connectDB();


app.use(cors());
app.use(express.json());
app.use('/', usersRouter);



//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
