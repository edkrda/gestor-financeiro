export interface Movimentacao {
    _id?: string;
    descricao: string;
    tipo: 'receita' | 'despesa';
    categoria: string;
    data: string;
    valor: number;
}
