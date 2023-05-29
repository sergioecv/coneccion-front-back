// libro.js
const mongoose = require('mongoose');

const EsqLibro = new mongoose.Schema({
  nombre: { type: String, required: true },
  autor: { type: String, required: true },
  editorial: { type: String, required: true },
});

const Libro = mongoose.model('Libro', EsqLibro);

module.exports = Libro;
