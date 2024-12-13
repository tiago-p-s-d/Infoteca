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



router.post('/status_do_livro/adicionar', async (req, res) => {
  const { isbn, status, id_usuario } = req.body;

  // Verifica se todos os dados necessários foram enviados
  if (!isbn || !status || !id_usuario) {
    return res.status(400).send('Por favor, forneça isbn, status e id_usuario.');
  }

  // Verifica se o status é válido (de acordo com a tabela de status)
  const checkStatusQuery = 'SELECT * FROM status WHERE id_status = ?';
  try {
    const [statusResult] = await pool.query(checkStatusQuery, [status]);
    if (statusResult.length === 0) {
      return res.status(400).send('Status inválido.');
    }

    // Insere os dados na tabela status_do_livro
    const query = 'INSERT INTO livro_status (isbn, id_status, id_usuario) VALUES (?, ?, ?)';
    const [results] = await pool.query(query, [isbn, status, id_usuario]);

    res.status(201).json({ message: 'Livro status atualizado com sucesso!', id: results.insertId });
  } catch (err) {
    console.error('Erro ao inserir no status_do_livro: ', err);
    res.status(500).send('Erro ao atualizar o status do livro.');
  }
});



module.exports = router;
