import { Observable, throwError } from 'rxjs';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { ICadastrosServico } from '@/app/dominio/contratos/servicos/cadastros.interface';
import { ICadastrosUsuarioUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/usuario.interface';
import { Injectable } from '@angular/core';
import { UsuarioCadastro } from '@/app/dominio/entidades/usuario/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class CadastrosUsuarioUseCase implements ICadastrosUsuarioUseCase {
    constructor(private _cadastrosServico: ICadastrosServico) {}

    cadastrarUsuario(cpf: string, nome: string): Observable<any> {
        return this._cadastrosServico.cadastrarUsuario(cpf, nome);
    }

    removerUsuario(cpf: string): Observable<any> {
        if (cpf) {
            return this._cadastrosServico.removerUsuario(cpf);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a remoção do usuário.',
                detalhes: 'Nao foi encontrado uma [matricula] para realizar a ação.',
                fluxo: 'cadastros.usecase:removerUsuario'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterListaUsuarios(): Observable<UsuarioCadastro[]> {
        return this._cadastrosServico.obterListaUsuarios();
    }
}
