/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/toeic-practice', {
  useNewUrlParser: true,
  useCreateIndex: true, // make sure that when Mongoose work with MongoDB, our indexes are created allowing to quickly access the data we need to access
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error.');
  console.error(err);
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connect successfully');
});
