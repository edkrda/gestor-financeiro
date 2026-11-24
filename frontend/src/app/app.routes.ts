import { Routes } from '@angular/router';

import { CadastrarMovimentacao } from './components/cadastrar-movimentacao/cadastrar-movimentacao';

import { ListaMovimentacoes } from './components/lista-movimentacoes/lista-movimentacoes';

import { ResumoFinanceiro } from './components/resumo-financeiro/resumo-financeiro';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'resumo',
        pathMatch: 'full'
    },

    {
        path: 'resumo',
        component: ResumoFinanceiro
    },

    {
        path: 'cadastrar',
        component: CadastrarMovimentacao
    },

    {
        path: 'movimentacoes',
        component: ListaMovimentacoes
    },

    {
        path: 'editar/:id',
        component: CadastrarMovimentacao
    }

];