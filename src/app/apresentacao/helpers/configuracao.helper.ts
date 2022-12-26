import { IConfiguracaoHelper } from '@/app/dominio/contratos/helpers/configuracao.interface';
import { CONFIG, Configuracao } from '@/app/dominio/entidades/sistema/configuracao.model';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfiguracaoHelper implements IConfiguracaoHelper {
    configuracao: Configuracao;

    constructor(@Inject(CONFIG) private _configuracao: Configuracao) {
        this.configuracao = this._configuracao;
    }
}
