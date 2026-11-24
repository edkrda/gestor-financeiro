import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Movimentacao } from '../../models/movimentacao';
import { MovimentacaoService } from '../../services/movimentacao';

@Component({
    selector: 'app-lista-movimentacoes',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './lista-movimentacoes.html',
    styleUrl: './lista-movimentacoes.css'
})

export class ListaMovimentacoes implements OnInit {

    movimentacoes: Movimentacao[] = [];

    categoriaSelecionada = '';

    mensagem = '';

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

    constructor(
        private service: MovimentacaoService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.listar();
    }

    listar(): void {

        this.service.listar().subscribe({
            next: (dados) => {
                this.movimentacoes = dados;
                this.mensagem = '';
                this.cdr.markForCheck();
            },
            error: () => {
                this.mensagem = 'Erro ao carregar movimentações.';
                this.cdr.markForCheck();
            }
        });
    }

    get movimentacoesFiltradas(): Movimentacao[] {

        if (this.categoriaSelecionada === '') {
            return this.movimentacoes;
        }

        return this.movimentacoes.filter(
            item => item.categoria === this.categoriaSelecionada
        );
    }

    excluir(id: string): void {

        const confirmar = confirm(
            'Deseja realmente excluir esta movimentação?'
        );

        if (confirmar) {

            this.service.excluir(id).subscribe({
                next: () => {
                    this.listar();
                },
                error: () => {
                    this.mensagem = 'Erro ao excluir movimentação.';
                    this.cdr.markForCheck();
                }
            });
        }
    }

    corCategoria(categoria: string): string {

        const cores: Record<string, string> = {
            'Salário': '#bbf7d0',
            'Investimentos': '#a7f3d0',
            'Alimentação': '#fed7aa',
            'Transporte': '#fef08a',
            'Moradia': '#bfdbfe',
            'Saúde': '#fecaca',
            'Educação': '#c7d2fe',
            'Lazer': '#e9d5ff',
            'Outros': '#e2e8f0'
        };

        return cores[categoria] || '#e2e8f0';
    }
}