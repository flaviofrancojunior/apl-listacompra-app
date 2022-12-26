import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IAcessoUseCase } from '@/app/dominio/contratos/casos-uso/acesso/acesso.interface';
import { IRepositorioImagens } from '@/app/dominio/contratos/repositorios/imagens.interface';

@Component({
    selector: 'sfr-acesso-card-login',
    templateUrl: './card-login.component.html',
    styleUrls: ['./card-login.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class AcessoCardLoginComponent {
    _form: UntypedFormGroup;

    constructor(private _formBuilder: UntypedFormBuilder, public estado: IEstadosHelper, private _acessoUseCase: IAcessoUseCase, private _navegacaoHelper: INavegacaoHelper, public repositorioImagens: IRepositorioImagens) {
        const parametros = <{ fluxo: string; login: string; inscricaoId: string }>this._navegacaoHelper.obterParametros();

        this.inicializarControle(parametros.login);
    }

    inicializarControle(login?: string) {
        const usuario = login ?? this._acessoUseCase.obterUsuarioGuardado();

        this._form = this._formBuilder.group({
            usuario: [{ value: usuario ? usuario : '', disabled: login ? true : false }, Validators.required],
            senha: ['', Validators.required],
            lembrarUsuario: [usuario ? true : false]
        });
    }

    realizarLogin() {
        this.estado.definirEstado(Estados.carregando, 'Autenticando...');

        this._acessoUseCase.autenticarUsuario(this._form.get('usuario')?.value, this._form.get('senha')?.value, this._form.get('lembrarUsuario')?.value).subscribe({
            next: () => {
                this._navegacaoHelper.ir(ROTAS.dashboard);
                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro: Erro) => {
                this._form.setErrors({ CredenciaisInvalidas: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
            }
        });
    }
}
