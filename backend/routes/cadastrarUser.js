const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const pool = require('../utils/db'); // Conexão com o banco de dados

// Rota para criar um novo usuário
router.post('/criar', async (req, res) => {
    const { nome_usuario, email, senha } = req.body;
  
    // Verifique se o email já existe no banco
    const queryCheckEmail = 'SELECT * FROM usuarios WHERE email = ?';
    pool.query(queryCheckEmail, [email], async (err, results) => {
      if (err) {
        console.error('Erro ao verificar o email:', err);
        return res.status(500).send('Erro ao verificar o email');
      }
  
      if (results.length > 0) {
        return res.status(400).send('Email já está em uso');
      }
  
      // Criptografar a senha
      const salt = await bcrypt.genSalt(10); // Gera o salt
      console.log(senha)
      const hashedPassword = await bcrypt.hash(senha, salt); // Criptografa a senha com o salt
      console.log(hashedPassword)
      // Insira o usuário no banco de dados com a senha criptografada
      const queryInsert = 'INSERT INTO usuarios (nome_usuario, email, senha) VALUES (?, ?, ?)';
      pool.query(queryInsert, [nome_usuario, email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Erro ao inserir o usuário:', err);
          return res.status(500).send('Erro ao criar o usuário');
        }
        console.log('Resultado da inserção:', results);
  
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
      });
    });
  });

module.exports = router;