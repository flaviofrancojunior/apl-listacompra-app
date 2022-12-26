import { Component, EventEmitter, Output } from '@angular/core';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';

import { IAcessoUseCase } from '@/app/dominio/contratos/casos-uso/acesso/acesso.interface';
import { Menu } from '@/app/dominio/entidades/acesso/menu.model';
import { Usuario } from '@/app/dominio/entidades/usuario/usuario.model';

@Component({
    selector: 'sfr-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    /** Guarda o número de notificações */
    _totalNotificacoes: number = 0;
    _titulo: string;

    _usuario: Usuario;

    @Output() selecionarCategoriaEvento = new EventEmitter<Menu[]>();

    constructor(public navegacaoHelper: INavegacaoHelper, private _acessoUseCase: IAcessoUseCase) {
        this._acessoUseCase.obterUsuarioLogado().subscribe((usuario) => {
            if (usuario) {
                this._usuario = usuario;
            }
        });
    }

    executarAcao(acao: 'meu-perfil' | 'sistema' | 'notificacao' | 'sair') {
        switch (acao) {
            case 'meu-perfil':
                this.navegacaoHelper.ir(ROTAS.dashboardMeuPerfil);
                break;
            case 'sistema':
                this.navegacaoHelper.ir(ROTAS.dashboardSistema);
                break;
            case 'notificacao':
                this.navegacaoHelper.ir(ROTAS.dashboardNotificacoes);
                break;
            case 'sair':
                this._acessoUseCase.deslogarUsuario();
                break;
            default:
                break;
        }
        this.selecionarCategoriaEvento.emit([]);
    }
}
