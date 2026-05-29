const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do banco de dados a partir de variáveis de ambiente
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'exemplo_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    // Testa a conexão
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    
    // Se conectou, envia o HTML
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err);
    res.status(500).send('Erro ao conectar ao banco de dados. Verifique os logs.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
