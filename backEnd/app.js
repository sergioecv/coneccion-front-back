// index.js
const express = require('express');
const Libro = require('./libro');
const cors = require("cors");
require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// Crear libro
app.post('/libros', (req, res) => {
  const { nombre, autor, editorial } = req.body;
  const libro = new Libro({ nombre, autor, editorial });

  libro.save().then((savedLibro) => {
    res.json(savedLibro);
  })
    .catch((err) => {
      res.status(500).json({ error: 'Error al crear un libro' });
    });
});

// Get Libros
app.get('/libros', (req, res) => {
  Libro.find().then((libros) => {
    res.json(libros);
  })
    .catch((err) => {
      res.status(500).json({ error: 'Error al obtener libros' });
    });
});

// Obtener libro por ID
app.get('/libros/:id', (req, res) => {
  const libroId = req.params.id;
  Libro.findById(libroId).then((libro) => {
    !libro ? res.status(404).json({ error: 'Libro no encontrado' }) : res.json(libro);
  })
    .catch((err) => {
      res.status(500).json({ error: 'Error al obtener libro' });
    });
});

// Acutalizar un libro por ID
app.put('/libros/:id', (req, res) => {
  const libroId = req.params.id;
  const { nombre, autor, editorial } = req.body;
  Libro.findByIdAndUpdate(libroId, { nombre, autor, editorial }, { new: true })
    .then((updatedLibro) => {
      !updatedLibro ? res.status(404).json({ error: 'Libro no encontrado' }) : res.json(updatedLibro);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error al actualizar el libro' });
    });
});

// Borrar un libro por ID
app.delete('/libros/:id', (req, res) => {
  const libroId = req.params.id;
  Libro.findByIdAndRemove(libroId).then((removedLibro) => {
    !removedLibro ? res.status(404).json({ error: 'Libro no encontrado' }) : res.json({ message: 'Libro borrado correctamente' });
  })
    .catch((err) => {
      res.status(500).json({ error: 'Error al borrar libro' });
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
