const mysql = require('mysql2/promise');

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',        // Host do banco de dados (pode ser outro se não estiver local)
  user: 'root',             // Usuário do banco de dados (substitua conforme necessário)
  password: '',             // Senha do banco de dados (substitua conforme necessário)
  database: 'infoteca',     // Nome do banco de dados
  waitForConnections: true, // Aguarda conexões, caso o limite de conexões simultâneas seja alcançado
  connectionLimit: 10,      // Limite de conexões simultâneas
  queueLimit: 0             // Sem limite de espera na fila
});

// Verifica se a conexão foi bem-sucedida
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro na conexão com o banco de dados: ', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida');
    connection.release(); // Libera a conexão após a verificação
  }
});

// Exporta o pool para uso em outros arquivos
module.exports = pool;