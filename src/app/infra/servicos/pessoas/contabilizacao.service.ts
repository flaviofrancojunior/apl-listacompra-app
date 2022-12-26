import { IContabilizacaoServico, RequisicaoAlterarLote, RequisicaoExecutarContabilizacao } from '@/app/dominio/contratos/servicos/contabilizacao.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { Injectable } from '@angular/core';
import { Lote } from '@/app/dominio/entidades/pessoas/contabilizacao.model';

@Injectable({
    providedIn: 'root'
})
export class ContabilizacaoServico implements IContabilizacaoServico {
    constructor(private _http: IHttpServico) {}

    obterListaLotes(pessoaId: ID, dataInicio: string, dataFim: string): Observable<Lote[]> {
        return this._http.executar<{ lista: Lote[] }>('get', `/pessoas/contabilizacao/get-lotes-lista/${pessoaId}/${dataInicio}/${dataFim}`).pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    alterarLote(id: ID, aberto: boolean): Observable<any> {
        const dados: RequisicaoAlterarLote = {
            id: id,
            aberto: aberto
        };
        return this._http.executar<{ dados: void }>('put', '/pessoas/contabilizacao/put-lote', { body: dados }).pipe(
            map((result) => {
                return result?.dados;
            }),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    executarContabilizacao(pessoaId: string, data: string): Observable<any> {
        const dados: RequisicaoExecutarContabilizacao = {
            pessoaId: pessoaId,
            data: data
        };
        return this._http.executar<any>('post', '/pessoas/contabilizacao/post-lote-contabilizar', { body: dados }).pipe(
            map((result) => result),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}
