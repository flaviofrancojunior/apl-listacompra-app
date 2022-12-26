import { IUsuariosBuscaUseCase } from '@/app/dominio/contratos/casos-uso/usuarios/busca.interface';
import { IUsuariosServico } from '@/app/dominio/contratos/servicos/usuarios.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioBusca } from '@/app/dominio/entidades/usuario/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosBuscaUseCase implements IUsuariosBuscaUseCase {
    constructor(private _usuariosServico: IUsuariosServico) {}

    obterListaUsuarios(): Observable<UsuarioBusca[]> {
        return this._usuariosServico.obterListaUsuarios();
    }
}
