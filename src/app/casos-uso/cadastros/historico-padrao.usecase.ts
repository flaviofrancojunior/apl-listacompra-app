import { Observable, throwError } from 'rxjs';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { HistoricoPadrao } from '@/app/dominio/entidades/cadastros/historico-padrao.model';
import { ICadastrosHistoricoPadraoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/historico-padrao.interface';
import { ICadastrosServico } from '@/app/dominio/contratos/servicos/cadastros.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CadastrosHistoricoPadraoUseCase implements ICadastrosHistoricoPadraoUseCase {
    constructor(private _cadastrosServico: ICadastrosServico) {}

    cadastrarHistoricoPadrao(historico: HistoricoPadrao): Observable<any> {
        return this._cadastrosServico.cadastrarHistoricoPadrao(historico);
    }
    alterarHistoricoPadrao(historico: HistoricoPadrao): Observable<any> {
        if (historico.id) {
            return this._cadastrosServico.alterarHistoricoPadrao(historico);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração do histórico padrão.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'cadastros.usecase:alterarHistoricoPadrao'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }
    obterListaHistoricoPadroes(): Observable<HistoricoPadrao[]> {
        return this._cadastrosServico.obterListaHistoricoPadroes();
    }
}
