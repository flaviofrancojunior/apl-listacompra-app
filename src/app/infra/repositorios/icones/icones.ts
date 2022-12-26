import { BibliotecaIcones, IRepositorioIcones, Icone } from '@/app/dominio/contratos/repositorios/icones.interface';

import { IConfiguracaoHelper } from '@/app/dominio/contratos/helpers/configuracao.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RepositorioIcones implements IRepositorioIcones {
    private _caminho: string;
    private _listaIcones: Icone[];

    constructor(private _configuracaoHelper: IConfiguracaoHelper) {
        this._caminho = this._configuracaoHelper.configuracao.caminho.icones;
        this._listaIcones = this.inicializarRepositorio();
    }

    obter(chave: keyof typeof BibliotecaIcones | undefined): Icone | undefined {
        if (chave) {
            let icone = this._listaIcones.find((icone) => {
                return icone.nome == chave;
            });
            if (icone) {
                return icone;
            } else {
                return undefined;
            }
        }
        return undefined;
    }

    private inicializarRepositorio(): Icone[] {
        let listaIcones: Icone[] = [];

        Object.keys(BibliotecaIcones).forEach((icone) => {
            listaIcones.push({ nome: icone, caminho: this._caminho + 'lib-icons.svg#' + icone });
        });

        return listaIcones;
    }
}
