import { Component } from '@angular/core';
import { IAcessoUseCase } from '@/app/dominio/contratos/casos-uso/acesso/acesso.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Menu } from '@/app/dominio/entidades/acesso/menu.model';
import { Tag } from '@/app/dominio/entidades/acesso/tag.model';

@Component({
    selector: 'sfr-base-logada',
    templateUrl: './logada.component.html',
    styleUrls: ['./logada.component.scss']
})
export class BaseLogadaComponent {
    _menu: Menu[];
    _subcategorias: Menu[];

    constructor(private _acessoUseCase: IAcessoUseCase, private _snackbarHelper: ISnackbarHelper) {
        this._acessoUseCase.obterMenu().subscribe({
            next: (menu) => {
                this._menu = menu;
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    definirSubcategorias(menu: Menu[]) {
        this._subcategorias = menu;
    }
}
