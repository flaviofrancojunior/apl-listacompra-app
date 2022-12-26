import { Observable, of, throwError } from 'rxjs';
import { Pessoa, PessoaDetalhe, Resumo } from '@/app/dominio/entidades/pessoas/pessoa.model';
import { catchError, delay, map, retry } from 'rxjs/operators';

import { Cartao } from '@/app/dominio/entidades/pessoas/cartao.model';
import { Conta } from '@/app/dominio/entidades/pessoas/conta.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { IPessoasServico } from '@/app/dominio/contratos/servicos/pessoas.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PessoasServico implements IPessoasServico {
    _listaPessoasCadastradas: Resumo = {
        totalCadastradas: 3,
        pessoas: [
            { id: '1', cpf: '1', nome: 'David Joseph Safra', planoContabilId: '1', ativo: true },
            { id: '2', cpf: '2', nome: 'Alberto Joseph Safra', planoContabilId: '2', ativo: true },
            { id: '3', cpf: '3', nome: 'Gaby Safra', planoContabilId: '1', ativo: true }
        ]
    };

    constructor(private _http: IHttpServico) {}

    cadastrarPessoa(pessoa: Pessoa): Observable<any> {
        return this._http.executar<{ dados: any }>('post', '/pessoas/post-pessoa', { body: pessoa }).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    alterarPessoa(pessoa: Pessoa): Observable<any> {
        return this._http.executar<{ dados: void }>('put', '/pessoas/put-pessoa', { body: pessoa }).pipe(
            map((result) => {
                return result?.dados;
            }),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterListaPessoas(): Observable<Pessoa[]> {
        return this._http.executar<{ lista: Pessoa[] }>('get', '/pessoas/get-pessoas-lista').pipe(
            map((result) => result?.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    removerPessoa(pessoaId: ID): Observable<void> {
        return this._http.executar<{ dados: void }>('post', `/pessoas/delete-pessoa/${pessoaId}`).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterPessoa(id: ID): Observable<PessoaDetalhe> {
        return this._http.executar<{ dados: PessoaDetalhe }>('get', `/pessoas/get-pessoa-detalhe/${id}`).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterResumoCadastradas(): Observable<Resumo> {
        return of(this._listaPessoasCadastradas).pipe(
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

    cadastrarConta(conta: Conta): Observable<any> {
        return this._http.executar<any>('post', '/pessoas/contas/post-conta', { body: conta }).pipe(
            map((result) => {
                return result;
            }),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    alterarConta(conta: Conta): Observable<any> {
        return this._http.executar<{ dados: void }>('put', '/pessoas/contas/put-conta', { body: conta }).pipe(
            map((result) => {
                return result?.dados;
            }),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    removerConta(pessoaId: ID, bancoId: ID, contaId: ID): Observable<any> {
        return this._http.executar<{ dados: void }>('post', `/pessoas/contas/delete-conta/${pessoaId}/${bancoId}/${contaId}`).pipe(
            map((result) => {
                return result?.dados;
            }),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    cadastrarCartao(cartao: Cartao): Observable<any> {
        return this._http.executar<any>('post', '/pessoas/cartoes/post-cartao', { body: cartao }).pipe(
            map((result) => {
                return result;
            }),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    alterarCartao(cartao: Cartao): Observable<any> {
        return this._http.executar<{ dados: void }>('put', '/pessoas/cartoes/put-cartao', { body: cartao }).pipe(
            map((result) => {
                return result?.dados;
            }),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}
