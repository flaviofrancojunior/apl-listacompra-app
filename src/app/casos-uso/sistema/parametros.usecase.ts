import { Observable, throwError } from 'rxjs';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { IParametrosServico } from '@/app/dominio/contratos/servicos/parametros.interface';
import { IParametrosUseCase } from '@/app/dominio/contratos/casos-uso/sistema/parametros.interface';
import { Injectable } from '@angular/core';
import { Parametro } from '@/app/dominio/entidades/sistema/parametro.model';

@Injectable({
    providedIn: 'root'
})
export class ParametrosUseCase implements IParametrosUseCase {
    constructor(private _parametrosServico: IParametrosServico) {}

    cadastrarParametro(parametro: Parametro): Observable<any> {
        return this._parametrosServico.cadastrarParametro(parametro);
    }

    alterarParametro(parametro: Parametro): Observable<any> {
        if (parametro.id) {
            return this._parametrosServico.alterarParametro(parametro);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração do parâmetro.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'parametros.usecase:alterarParametro'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    removerParametro(parametroId: string): Observable<any> {
        if (parametroId) {
            return this._parametrosServico.removerParametro(parametroId);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a remoção do parâmetro.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'parametros.usecase:removerParametro'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterListaParametros(): Observable<Parametro[]> {
        return this._parametrosServico.obterListaParametros();
    }

    obterParametroPorChave(chave: string): Observable<Parametro> {
        if (chave) {
            return this._parametrosServico.obterParametroPorChave(chave);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a obtenção do parâmetro.',
                detalhes: 'Nao foi encontrado uma [chave] para realizar a ação.',
                fluxo: 'parametros.usecase:obterParametroPorChave'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }
}
