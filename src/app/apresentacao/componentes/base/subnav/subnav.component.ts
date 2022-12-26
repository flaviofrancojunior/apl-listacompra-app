import { Component, Input, ViewChild } from '@angular/core';

import { IAcessoUseCase } from '@/app/dominio/contratos/casos-uso/acesso/acesso.interface';
import { INavegacaoHelper } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { MatAccordion } from '@angular/material/expansion';
import { Menu } from '@/app/dominio/entidades/acesso/menu.model';
import { Tag } from '@/app/dominio/entidades/acesso/tag.model';

@Component({
    selector: 'sfr-subnav',
    templateUrl: './subnav.component.html',
    styleUrls: ['./subnav.component.scss']
})
export class SubnavComponent {
    _expandido: boolean = true;
    _subcategorias: Menu[];

    @Input() menu: Menu[];

    @ViewChild(MatAccordion) menuCategorias: MatAccordion;

    constructor(public navegacaoHelper: INavegacaoHelper, private _acessoUseCase: IAcessoUseCase) {
        this.navegacaoHelper.rotaAtual.subscribe({
            next: (rota) => {
                this.validarRotaAtual(rota?.url);
            }
        });
    }

    executarAcesso(menu: Menu) {
        if (menu) {
            this._acessoUseCase.executarAcesso(menu.detalhes as Tag);
        }
    }

    mudarExpansao() {
        this._expandido = !this._expandido;
    }

    validarRotaAtual(rota?: string) {
        if (rota && this.menu) {
            this._subcategorias = [];
            this.encontrarRotaCategoria(rota, this.menu);
        }
    }

    encontrarRotaCategoria(rota: string, menu: Menu[]) {
        if (menu.length === 0) {
            return;
        }

        menu.forEach((elemento) => {
            const filhoEncontrado = elemento.itens.find((filho) => filho.detalhes?.rotaBase?.url === rota);

            if (filhoEncontrado) {
                this._subcategorias = elemento.itens;
                return;
            } else {
                return this.encontrarRotaCategoria(rota, elemento.itens);
            }
        });
    }
}
