const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.google.com.br');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/user-guild/parametros/Hugo', (req, res) => {
  res.json({ message: 'Dados retornados da Função Serverless do Vercel com CORS para Google!' });
});

module.exports = app;