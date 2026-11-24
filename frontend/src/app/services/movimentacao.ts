import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimentacao } from '../models/movimentacao';

@Injectable({
    providedIn: 'root'
})
export class MovimentacaoService {

    private apiUrl = 'http://localhost:3000/api/movimentacoes';

    constructor(private http: HttpClient) {}

    listar(): Observable<Movimentacao[]> {
        return this.http.get<Movimentacao[]>(this.apiUrl);
    }

    cadastrar(movimentacao: Movimentacao): Observable<Movimentacao> {
        return this.http.post<Movimentacao>(
            this.apiUrl,
            movimentacao
        );
    }

    editar(id: string, movimentacao: Movimentacao): Observable<Movimentacao> {
        return this.http.put<Movimentacao>(
            `${this.apiUrl}/${id}`,
            movimentacao
        );
    }

    excluir(id: string): Observable<{ mensagem: string }> {
        return this.http.delete<{ mensagem: string }>(
            `${this.apiUrl}/${id}`
        );
    }
}