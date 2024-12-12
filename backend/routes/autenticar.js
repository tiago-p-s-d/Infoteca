const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../utils/db'); // Importa o pool de conexões com promessas

const SECRET_KEY = 'infoteca'; // Chave secreta para o JWT

// Rota para autenticar usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  // Verifica se os campos email e senha foram enviados
  if (!email || !senha) {
    return res.status(400).send('Email e senha são obrigatórios');
  }

  try {
    // Busca o usuário no banco de dados
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).send('Usuário não encontrado');
    }

    const usuario = rows[0];

    // Compara a senha fornecida com a senha armazenada (criptografada)
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(401).send('Senha inválida');
    }

    // Gera um JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, email: usuario.email },
      SECRET_KEY, // A chave secreta para assinatura do token
      { expiresIn: '1h' } // O token expira em 1 hora
    );

    res.json({
      token,
      id_usuario: usuario.id_usuario,
    }); // Retorna o token para o cliente
  } catch (err) {
    console.error('Erro ao processar login:', err);
    return res.status(500).send('Erro interno no servidor');
  }
});

module.exports = router;
