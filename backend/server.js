const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const movimentacaoRoutes = require('./routes/movimentacaoRoutes');

const app = express();

// Configurações do Express
app.use(cors());
app.use(express.json());

// Rotas das movimentações financeiras
app.use('/api/movimentacoes', movimentacaoRoutes);

// Rota principal
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API do Gestor Financeiro funcionando!'
    });
});

// Porta do servidor
const PORT = process.env.PORT;

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado com sucesso!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((erro) => {
        console.log('Erro ao conectar ao MongoDB:', erro);
    });