import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { IParametrosServico } from '@/app/dominio/contratos/servicos/parametros.interface';
import { Injectable } from '@angular/core';
import { Parametro } from '@/app/dominio/entidades/sistema/parametro.model';

@Injectable({
    providedIn: 'root'
})
export class ParametrosServico implements IParametrosServico {
    constructor(private _http: IHttpServico) {}

    cadastrarParametro(parametro: Parametro): Observable<any> {
        return this._http.executar<any>('post', '/cadastros/parametros/post-parametro', { body: parametro }).pipe(
            map((result) => result),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    alterarParametro(parametro: Parametro): Observable<any> {
        return this._http.executar<{ dados: void }>('put', '/cadastros/parametros/put-parametro', { body: parametro }).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    removerParametro(parametroId: string): Observable<any> {
        return this._http.executar<{ dados: void }>('post', `/cadastros/parametros/delete-parametro/${parametroId}`).pipe(
            map((result) => result?.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterListaParametros(): Observable<Parametro[]> {
        return this._http.executar<{ lista: Parametro[] }>('get', `/cadastros/parametros/get-parametro-lista`).pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterParametroPorChave(chave: string): Observable<Parametro> {
        return this._http.executar<{ dados: Parametro }>('get', `/cadastros/parametros/get-parametro-chave/${chave}`).pipe(
            map((result) => result.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}
