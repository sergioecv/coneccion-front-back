// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/libros-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));
