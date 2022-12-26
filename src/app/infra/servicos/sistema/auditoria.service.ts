import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { IAuditoriaServico } from '@/app/dominio/contratos/servicos/auditoria.interface';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { Injectable } from '@angular/core';
import { Operacao } from '@/app/dominio/entidades/sistema/auditoria.model';

@Injectable({
    providedIn: 'root'
})
export class AuditoriaServico implements IAuditoriaServico {
    constructor(private _http: IHttpServico) {}

    obterListaOperacoes(dataInicio: string, dataFim: string): Observable<Operacao[]> {
        return this._http.executar<{ lista: Operacao[] }>('get', `/cadastros/auditoria/get-auditoria-periodo-lista/${dataInicio}/${dataFim}`).pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}
