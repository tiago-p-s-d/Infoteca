/*const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Função para login de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o email existe
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = rows[0];

    // Verificar se a senha está correta
    const isPasswordCorrect = await bcrypt.compare(password, user.senha);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ userId: user.id_usuario }, 'secrectKey', { expiresIn: '1h' });

    return res.json({ token, userId: user.id_usuario });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};
*/