const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../utils/db'); // Importa o pool de conexões do db.js


const SECRET_KEY = 'infoteca';

// Rota para obter todos os livros
/*router.get('/users', (req, res) => {
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
*/


// Rota para autenticar usuário
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Verifica se os campos email e senha foram enviados
  if (!email || !senha) {
    return res.status(400).send('Email e senha são obrigatórios');
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  
  pool.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário: ', err);
      return res.status(500).send('Erro ao buscar usuário');
    }

    if (results.length === 0) {
      return res.status(401).send('Usuário não encontrado');
    }

    const usuario = results[0];

    // Compara a senha fornecida com a senha armazenada (criptografada)
    bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
      if (err) {
        console.error('Erro ao comparar senhas: ', err);
        return res.status(500).send('Erro ao validar a senha');
      }

      if (!isMatch) {
        return res.status(401).send('Senha inválida');
      }

      // Gera um JWT
      const token = jwt.sign(
        { id_usuario: usuario.id_usuario, email: usuario.email },
        SECRET_KEY, // A chave secreta para assinatura do token
        { expiresIn: '1h' } // O token expira em 1 hora
      );

      res.json({ token }); // Retorna o token para o cliente
    });
  });
});
module.exports = router;
