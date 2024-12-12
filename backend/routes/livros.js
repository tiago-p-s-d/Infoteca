const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // Importa o pool de conexões do db.js

// Rota para obter todos os livros
router.get('/livros', async (req, res) => {
  const query = 'SELECT * FROM resenhas';

  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (err) {
    console.error('Erro na consulta: ', err);
    res.status(500).send('Erro ao buscar livros');
  }
});

// Exemplo de outra rota para obter resenhas de um livro
router.get('/resenhas/:id_livro', async (req, res) => {
  const { id_livro } = req.params;
  const query = 'SELECT u.nome_usuario, r.comentario FROM resenhas r JOIN usuarios u ON r.id_usuario = u.id_usuario WHERE r.id_livro = ?';

  try {
    const [results] = await pool.query(query, [id_livro]);
    res.json(results);
  } catch (err) {
    console.error('Erro na consulta: ', err);
    res.status(500).send('Erro ao buscar resenhas');
  }
});

// Rota para postar uma resenha
router.post('/resenhas/postar', async (req, res) => {
  const { id_livro, id_usuario, comentario } = req.body;

  // Verifica se todos os dados necessários foram enviados
  if (!id_livro || !id_usuario || !comentario) {
    return res.status(400).send('Por favor, forneça id_livro, id_usuario e comentario.');
  }

  const query = 'INSERT INTO resenhas (id_livro, id_usuario, comentario) VALUES (?, ?, ?)';

  try {
    const [results] = await pool.query(query, [id_livro, id_usuario, comentario]);
    res.status(201).json({ message: 'Resenha cadastrada com sucesso!', resenhaId: results.insertId });
  } catch (err) {
    console.error('Erro ao inserir resenha: ', err);
    res.status(500).send('Erro ao cadastrar a resenha.');
  }
});

module.exports = router;
