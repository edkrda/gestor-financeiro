import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Movimentacao } from '../../models/movimentacao';
import { MovimentacaoService } from '../../services/movimentacao';

@Component({
    selector: 'app-cadastrar-movimentacao',
    imports: [CommonModule, FormsModule],
    templateUrl: './cadastrar-movimentacao.html',
    styleUrl: './cadastrar-movimentacao.css'
})

export class CadastrarMovimentacao implements OnInit {

    movimentacao: Movimentacao = {
        descricao: '',
        tipo: 'receita',
        categoria: '',
        data: '',
        valor: 0
    };

    categorias = [
        'Salário',
        'Investimentos',
        'Alimentação',
        'Transporte',
        'Moradia',
        'Saúde',
        'Educação',
        'Lazer',
        'Outros'
    ];

    editando = false;
    id = '';
    mensagem = '';

    constructor(
        private service: MovimentacaoService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {

        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.editando = true;
            this.id = id;

            this.service.listar().subscribe({
                next: (dados) => {

                    const encontrada = dados.find(
                        item => item._id === id
                    );

                    if (encontrada) {
                        this.movimentacao = {
                            ...encontrada,
                            data: encontrada.data.substring(0, 10)
                        };
                    } else {
                        this.mensagem = 'Movimentação não encontrada.';
                    }
                },
                error: () => {
                    this.mensagem = 'Erro ao buscar movimentação.';
                }
            });
        }
    }

    salvar(): void {

        if (this.editando) {

            this.service.editar(
                this.id,
                this.movimentacao
            ).subscribe({
                next: () => {
                    this.router.navigate(['/movimentacoes']);
                },
                error: () => {
                    this.mensagem = 'Erro ao editar movimentação.';
                }
            });

        } else {

            this.service.cadastrar(
                this.movimentacao
            ).subscribe({
                next: () => {
                    this.router.navigate(['/movimentacoes']);
                },
                error: () => {
                    this.mensagem = 'Erro ao cadastrar movimentação.';
                }
            });
        }
    }
}