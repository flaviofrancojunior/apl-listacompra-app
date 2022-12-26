import { Observable, throwError } from 'rxjs';

import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { IContabilizacaoServico } from '@/app/dominio/contratos/servicos/contabilizacao.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IPessoasContabilizacaoUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/contabilizacao.interface';
import { Injectable } from '@angular/core';
import { Lote } from '@/app/dominio/entidades/pessoas/contabilizacao.model';

@Injectable({
    providedIn: 'root'
})
export class PessoasContabilizacaoUseCase implements IPessoasContabilizacaoUseCase {
    constructor(private _contabilizacaoServico: IContabilizacaoServico) {}

    obterListaLotes(pessoaId: ID, dataInicio: string, dataFim: string): Observable<Lote[]> {
        return this._contabilizacaoServico.obterListaLotes(pessoaId, dataInicio, dataFim);
    }

    alterarLote(lote: Lote): Observable<any> {
        if (lote?.id) {
            return this._contabilizacaoServico.alterarLote(lote.id, lote.aberto);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração do lote.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'contabilizacao.usecase:alterarLote'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    executarContabilizacao(pessoaId: ID, data: string): Observable<any> {
        return this._contabilizacaoServico.executarContabilizacao(pessoaId, data);
    }
}
