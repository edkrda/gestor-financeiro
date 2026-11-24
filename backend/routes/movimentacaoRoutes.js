const express = require('express');
const Movimentacao = require('../models/Movimentacao');

const router = express.Router();

// CREATE - Cadastrar movimentação
router.post('/', async (req, res) => {
    try {
        const movimentacao = await Movimentacao.create(req.body);

        res.status(201).json(movimentacao);

    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
});

// READ - Listar movimentações
router.get('/', async (req, res) => {
    try {
        const movimentacoes = await Movimentacao.find();

        res.status(200).json(movimentacoes);

    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
});

// UPDATE - Editar movimentação
router.put('/:id', async (req, res) => {
    try {
        const movimentacao = await Movimentacao.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!movimentacao) {
            return res.status(404).json({
                mensagem: 'Movimentação não encontrada'
            });
        }

        res.status(200).json(movimentacao);

    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
});

// DELETE - Excluir movimentação
router.delete('/:id', async (req, res) => {
    try {
        const movimentacao = await Movimentacao.findByIdAndDelete(
            req.params.id
        );

        if (!movimentacao) {
            return res.status(404).json({
                mensagem: 'Movimentação não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Movimentação excluída com sucesso!'
        });

    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
});

module.exports = router;