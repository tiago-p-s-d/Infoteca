const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../utils/db'); // Importa o pool de conexões do db.js


const SECRET_KEY = 'infoteca';

// Rota para obter todos os livros
router.get('/users', (req, res) => {
  const query = 'SELECT * FROM usuarios;';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Erro na consulta: ', err);
      res.status(500).send('Erro ao buscar livros');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
