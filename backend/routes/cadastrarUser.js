const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const pool = require('../utils/db'); // Conexão com o banco de dados

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'qalhowow@gmail.com', // Seu email
    pass: 'senha do aplicativo', // Senha de aplicativo do Gmail
  },
});

// Rota para criar um novo usuário
router.post('/criar', async (req, res) => {
  const { nome_usuario, email, senha } = req.body;

  try {
    // Verifique se o email já existe no banco de dados
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length > 0) {
      return res.status(400).send('Email já está em uso');
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10); // Gera o salt
    const hashedPassword = await bcrypt.hash(senha, salt); // Criptografa a senha com o salt

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Insira o usuário no banco de dados com a senha criptografada
    await pool.execute(
      'INSERT INTO usuarios (nome_usuario, email, senha, codigo_verificacao, is_autenticado) VALUES (?, ?, ?, ?, ?)',
      [nome_usuario, email, hashedPassword, verificationCode, 0]
    );

    // Enviar o código de verificação por e-mail
    const mailOptions = {
      from: 'qalhowow@gmail.com', // Seu email
      to: email, // E-mail do usuário
      subject: 'Confirmação de Registro',
      html: `
        <h1>Bem-vindo(a), ${nome_usuario}!</h1>
        <p>Obrigado por se registrar. Aqui está seu código de verificação:</p>
        <h2>${verificationCode}</h2>
        <p>Use este código para validar sua conta no sistema.</p>
      `,
    };

    // Enviar o e-mail
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado para:', email);

    res.status(201).json({
      message: 'Usuário registrado com sucesso! Código de verificação enviado por e-mail.',
    });

  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    res.status(500).send('Erro ao criar o usuário ou ao enviar o e-mail.');
  }
});
// Rota para validar o código de verificação
router.post('/verificar', async (req, res) => {
  const { email, codigo_verificacao } = req.body;

  try {
    // Adicionando logs para depuração do corpo da requisição
    console.log(`Validando código para o e-mail: ${email} e código: ${codigo_verificacao}`);

    // Verificar se o código de verificação é válido para o e-mail informado
    const result = await pool.execute(
      'SELECT * FROM usuarios WHERE email = ? AND codigo_verificacao = ?',
      [email, codigo_verificacao]
    );

    // Log detalhado para ver o que foi retornado
    console.log('Resultado da consulta:', result);

    // Verificar se result[0] contém os dados esperados
    if (result && result[0] && Array.isArray(result[0])) {
      const rows = result[0];

      if (rows.length === 0) {
        console.error('Código de verificação inválido ou expirado.');
        return res.status(400).send('Código de verificação inválido ou expirado.');
      }

      // Atualizar o campo 'is_autenticado' para 1 (verificado)
      await pool.execute(
        'UPDATE usuarios SET is_autenticado = 1, codigo_verificacao = NULL WHERE email = ?',
        [email]
      );

      return res.status(200).json({ message: 'Conta verificada com sucesso!' });
    } else {
      // Caso não seja o retorno esperado
      console.error('Resultado inválido:', result);
      return res.status(500).send('Erro ao consultar a base de dados.');
    }

  } catch (error) {
    console.error('Erro ao verificar a conta:', error);
    return res.status(500).send('Erro ao validar a conta.');
  }
});

module.exports = router;
