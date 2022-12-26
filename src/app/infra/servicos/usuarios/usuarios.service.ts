import { Observable, throwError } from 'rxjs';
import { Usuario, UsuarioBusca } from '@/app/dominio/entidades/usuario/usuario.model';
import { catchError, map, retry } from 'rxjs/operators';

import { IHttpServico } from '@/app/dominio/contratos/servicos/http.interface';
import { IUsuariosServico } from '@/app/dominio/contratos/servicos/usuarios.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsuariosServico implements IUsuariosServico {
    constructor(private _http: IHttpServico) {}

    obterListaUsuarios(): Observable<UsuarioBusca[]> {
        return this._http.executar<{ lista: UsuarioBusca[] }>('get', '/usuarios/get-usuarios-busca-lista').pipe(
            map((result) => result.lista),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }

    obterDadosUsuario(): Observable<Usuario> {
        return this._http.executar<{ dados: Usuario }>('get', '/usuarios/get-usuario').pipe(
            map((result) => result.dados),
            retry(0),
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}
