const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users');


dotenv.config();
const uri = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
