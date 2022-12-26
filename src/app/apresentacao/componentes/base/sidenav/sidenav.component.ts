import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { IAcessoUseCase } from '@/app/dominio/contratos/casos-uso/acesso/acesso.interface';
import { INavegacaoHelper } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { MatAccordion } from '@angular/material/expansion';
import { Menu } from '@/app/dominio/entidades/acesso/menu.model';
import { Tag } from '@/app/dominio/entidades/acesso/tag.model';

/* eslint-disable @angular-eslint/directive-selector */

@Component({
    selector: 'sfr-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
    _expandido: boolean = false;

    @Input() menu: Menu[];

    @Output() selecionarCategoriaEvento = new EventEmitter<Menu[]>();

    constructor(public navegacaoHelper: INavegacaoHelper, private _acessoUseCase: IAcessoUseCase) {}

    executarAcesso(menu: Menu) {
        if (menu) {
            this._acessoUseCase.executarAcesso(menu.detalhes as Tag);

            const categoria = this.menu.find((categoria) => categoria.tag === menu.tag);
            this.selecionarCategoriaEvento.emit(categoria?.itens);
        }
    }
}
