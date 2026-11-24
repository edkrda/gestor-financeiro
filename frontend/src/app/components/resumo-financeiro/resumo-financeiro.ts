import {
    Component,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
    ElementRef,
    ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

import { Movimentacao } from '../../models/movimentacao';
import { MovimentacaoService } from '../../services/movimentacao';

@Component({
    selector: 'app-resumo-financeiro',
    imports: [CommonModule],
    templateUrl: './resumo-financeiro.html',
    styleUrl: './resumo-financeiro.css'
})

export class ResumoFinanceiro implements OnInit, OnDestroy {

    @ViewChild('graficoPizza', { static: true })
    canvas!: ElementRef<HTMLCanvasElement>;

    grafico?: Chart;

    movimentacoes: Movimentacao[] = [];

    totalReceitas = 0;
    totalDespesas = 0;
    saldo = 0;

    mensagem = '';
    carregando = true;

    constructor(
        private service: MovimentacaoService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.carregarMovimentacoes();
    }

    carregarMovimentacoes(): void {

        this.service.listar().subscribe({

            next: (dados) => {

                this.movimentacoes = dados;

                this.calcularSaldo();

                this.carregando = false;

                this.criarGrafico();

                this.cdr.markForCheck();
            },

            error: () => {

                this.mensagem = 'Erro ao carregar os dados financeiros.';

                this.carregando = false;

                this.cdr.markForCheck();
            }

        });
    }

    calcularSaldo(): void {

        this.totalReceitas = this.movimentacoes
            .filter(item => item.tipo === 'receita')
            .reduce((total, item) => total + item.valor, 0);

        this.totalDespesas = this.movimentacoes
            .filter(item => item.tipo === 'despesa')
            .reduce((total, item) => total + item.valor, 0);

        this.saldo = this.totalReceitas - this.totalDespesas;
    }

    criarGrafico(): void {

        const despesas = this.movimentacoes.filter(
            item => item.tipo === 'despesa'
        );

        const categorias: Record<string, number> = {};

        despesas.forEach(item => {

            categorias[item.categoria] =
                (categorias[item.categoria] || 0) + item.valor;

        });

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

        if (this.grafico) {
            this.grafico.destroy();
        }

        this.grafico = new Chart(this.canvas.nativeElement, {

            type: 'pie',

            data: {

                labels: Object.keys(categorias),

                datasets: [{

                    data: Object.values(categorias),

                    backgroundColor: Object.keys(categorias).map(
                        categoria => cores[categoria] || '#94a3b8'
                    ),

                    borderColor: '#ffffff',

                    borderWidth: 2

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: 'bottom'
                    }

                }

            }

        });
    }

    ngOnDestroy(): void {

        if (this.grafico) {
            this.grafico.destroy();
        }

    }
}