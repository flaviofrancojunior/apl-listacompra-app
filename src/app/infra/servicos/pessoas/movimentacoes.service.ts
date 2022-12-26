import { MovimentacaoFinanceira, Resumo } from '@/app/dominio/entidades/movimentacao/movimentacao.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, retry } from 'rxjs/operators';

import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { IMovimentacoesServico } from '@/app/dominio/contratos/servicos/movimentacoes.interface';
import { Injectable } from '@angular/core';
import { MovimentacaoContabil } from '@/app/dominio/entidades/movimentacao/contabil.model';

@Injectable({
    providedIn: 'root'
})
export class MovimentacoesServico implements IMovimentacoesServico {
    _listaNovasMovimentacoes: Resumo = {
        totalNovasMovimentacoes: 27,
        pessoas: [
            { id: '1', cpf: '1', nome: 'David Joseph Safra', totalNovasMovimentacoes: 12, planoContabilId: '1', ativo: true },
            { id: '3', cpf: '3', nome: 'Gaby Safra', totalNovasMovimentacoes: 5, planoContabilId: '1', ativo: true }
        ]
    };

    constructor(private _http: IHttpServico) {}

    obterResumoNovasMovimentacoes(): Observable<Resumo> {
        return of(this._listaNovasMovimentacoes).pipe(
            map((result) => result),
            delay(1000)
        );

        return this._http.executar<{ dados: Resumo }>('get', '/pessoas/get-resumo-movimentacoes').pipe(
            map((result) => result.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    cadastrarMovimentacaoFinanceira(movimentacao: MovimentacaoFinanceira): Observable<ID> {
        return this._http.executar<{ dados: ID }>('post', '/pessoas/movimentacoes/financeiras/post-movimentacao-financeira', { body: movimentacao }).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    alterarMovimentacaoFinanceira(movimentacao: MovimentacaoFinanceira): Observable<any> {
        return this._http.executar<{ dados: void }>('put', '/pessoas/movimentacoes/financeiras/put-movimentacao-financeira', { body: movimentacao }).pipe(
            map((result) => {
                return result?.dados;
            }),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    removerMovimentacaoFinanceira(pessoaId: ID, bancoId: ID, contaId: ID, movimentacaoId: ID): Observable<any> {
        return this._http.executar<{ dados: void }>('post', `/pessoas/movimentacoes/financeiras/delete-movimentacao-financeira/${pessoaId}/${bancoId}/${contaId}/${movimentacaoId}`).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterListaMovimentacoesFinanceiras(pessoaId: ID, bancoId: ID, contaId: ID, dataInicio: string, dataFim: string): Observable<MovimentacaoFinanceira[]> {
        return this._http.executar<{ lista: MovimentacaoFinanceira[] }>('get', `/pessoas/movimentacoes/financeiras/get-movimentacoes-financeiras-lista/${pessoaId}/${bancoId}/${contaId}/${dataInicio}/${dataFim}`).pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    cadastrarMovimentacaoContabil(movimentacao: MovimentacaoContabil): Observable<ID> {
        return this._http.executar<{ dados: ID }>('post', '/pessoas/movimentacoes/contabeis/post-movimentacao-contabil', { body: movimentacao }).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    alterarMovimentacaoContabil(movimentacao: MovimentacaoContabil): Observable<any> {
        return this._http.executar<{ dados: void }>('put', '/pessoas/movimentacoes/contabeis/put-movimentacao-contabil', { body: movimentacao }).pipe(
            map((result) => {
                return result?.dados;
            }),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    removerMovimentacaoContabil(pessoaId: ID, movimentacaoId: ID): Observable<any> {
        return this._http.executar<{ dados: void }>('post', `/pessoas/movimentacoes/contabeis/delete-movimentacao-contabil/${pessoaId}/${movimentacaoId}`).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    obterListaMovimentacoesContabeis(pessoaId: ID, dataInicio: string, dataFim: string): Observable<MovimentacaoContabil[]> {
        return this._http.executar<{ lista: MovimentacaoContabil[] }>('get', `/pessoas/movimentacoes/contabeis/get-movimentacoes-contabeis-lista/${pessoaId}/${dataInicio}/${dataFim}`).pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
    obterMovimentacaoContabilDetalhe(pessoaId: ID, movimentacaoId: ID): Observable<MovimentacaoContabil[]> {
        return this._http.executar<{ lista: MovimentacaoContabil[] }>('get', `/pessoas/movimentacoes/contabeis/get-movimentacao-contabil-detalhe-id/${pessoaId}/${movimentacaoId}`).pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}
