import { IUsuariosDadosUseCase } from '@/app/dominio/contratos/casos-uso/usuarios/dados.interface';
import { IUsuariosServico } from '@/app/dominio/contratos/servicos/usuarios.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '@/app/dominio/entidades/usuario/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosDadosUseCase implements IUsuariosDadosUseCase {
    constructor(private _usuariosServico: IUsuariosServico) {}

    obterUsuario(): Observable<Usuario> {
        return this._usuariosServico.obterDadosUsuario();
    }
}
