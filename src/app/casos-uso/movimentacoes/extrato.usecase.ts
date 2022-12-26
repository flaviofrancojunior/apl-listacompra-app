import { Observable, throwError } from 'rxjs';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IExtratoServico } from '@/app/dominio/contratos/servicos/extrato.interface';
import { IMovimentacoesExtratoUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/extrato.interface';
import { Injectable } from '@angular/core';
import { Lancamento } from '@/app/dominio/entidades/movimentacao/extrato.model';

@Injectable({
    providedIn: 'root'
})
export class MovimentacoesExtratoUseCase implements IMovimentacoesExtratoUseCase {
    constructor(private _extratoServico: IExtratoServico) {}

    obterExtrato(pessoaId: ID, bancoId: ID, contaId: ID, dataInicio: string, dataFim: string): Observable<Lancamento[]> {
        if (pessoaId && bancoId && contaId && dataInicio && dataFim) {
            return this._extratoServico.obterExtrato(pessoaId, bancoId, contaId, dataInicio, dataFim);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a obtenção do extrato.',
                detalhes: 'Nao foi encontrado um [pessoaId][bancoId][contaId][dataInicio][dataFim] para realizar a ação.',
                fluxo: 'extrato.usecase:obterExtrato'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    obterExtratoMensal(pessoaId: ID, bancoId: ID, contaId: ID, data: string): Observable<Lancamento[]> {
        if (pessoaId && bancoId && contaId && data) {
            return this._extratoServico.obterExtratoMensal(pessoaId, bancoId, contaId, data);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a obtenção do extrato mensal.',
                detalhes: 'Nao foi encontrado um [pessoaId][bancoId][contaId][data] para realizar a ação.',
                fluxo: 'extrato.usecase:obterExtrato'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }
}
