const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // Importa o pool de conexões do db.js

// Rota para obter todos os livros
router.get('/livros', (req, res) => {
  const query = 'SELECT * FROM resenhas';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Erro na consulta: ', err);
      res.status(500).send('Erro ao buscar livros');
    } else {
      res.json(results);
    }
  });
});

// Exemplo de outra rota para obter resenhas de um livro
router.get('/resenhas/:id_livro', (req, res) => {
  const { id_livro } = req.params;
  const query = 'SELECT u.nome_usuario, r.comentario FROM resenhas r JOIN usuarios u ON r.id_usuario = u.id_usuario WHERE r.id_livro = ?';

  pool.query(query, [id_livro], (err, results) => {
    if (err) {
      console.error('Erro na consulta: ', err);
      res.status(500).send('Erro ao buscar resenhas');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
