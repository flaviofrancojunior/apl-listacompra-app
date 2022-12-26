import { IAcessoServico, RequisicaoAutenticarUsuario, RespostaAutenticarUsuario } from '@/app/dominio/contratos/servicos/acesso.interface';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { IConfiguracaoHelper } from '@/app/dominio/contratos/helpers/configuracao.interface';
import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { Injectable } from '@angular/core';
import { Usuario } from '@/app/dominio/entidades/usuario/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AcessoServico implements IAcessoServico {
    constructor(private _http: IHttpServico, private _configuracaoHelper: IConfiguracaoHelper) {}

    autenticarUsuario(usuario: string, chave: string): Observable<RespostaAutenticarUsuario> {
        const dadosRequisicao: RequisicaoAutenticarUsuario = {
            idEstrategia: this._configuracaoHelper.configuracao.acesso.estrategia,
            credenciais: {
                userId: usuario,
                password: chave
            }
        };

        return this._http.executar<RespostaAutenticarUsuario>('post', '/autenticacao/autenticar', { body: dadosRequisicao }).pipe(
            map((result) => result),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}
