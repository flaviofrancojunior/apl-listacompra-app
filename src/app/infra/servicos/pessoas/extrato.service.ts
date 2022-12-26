import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IExtratoServico } from '@/app/dominio/contratos/servicos/extrato.interface';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { Injectable } from '@angular/core';
import { Lancamento } from '@/app/dominio/entidades/movimentacao/extrato.model';

@Injectable({
    providedIn: 'root'
})
export class ExtratoServico implements IExtratoServico {
    constructor(private _http: IHttpServico) {}

    obterExtrato(pessoaId: ID, bancoId: ID, contaId: ID, dataInicio: string, dataFim: string): Observable<Lancamento[]> {
        return this._http.executar<{ lista: Lancamento[] }>('get', `/pessoas/movimentacoes/extrato/get-extrato-espelho-lista/${pessoaId}/${bancoId}/${contaId}/${dataInicio}/${dataFim}`).pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterExtratoMensal(pessoaId: ID, bancoId: ID, contaId: ID, data: string): Observable<Lancamento[]> {
        return this._http.executar<{ lista: Lancamento[] }>('get', `/pessoas/movimentacoes/extrato/get-extrato-recente-lista/${pessoaId}/${bancoId}/${contaId}/${data}`).pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}
