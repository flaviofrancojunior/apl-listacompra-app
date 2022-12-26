import { Observable, throwError } from 'rxjs';

import { Conta } from '@/app/dominio/entidades/pessoas/conta.model';
import { ErroNegocio } from '@/app/dominio/entidades/sistema/erro.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IPessoasContasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/contas.interface';
import { IPessoasServico } from '@/app/dominio/contratos/servicos/pessoas.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PessoasContasUseCase implements IPessoasContasUseCase {
    constructor(private _pessoasServico: IPessoasServico) {}

    cadastrarConta(conta: Conta): Observable<any> {
        return this._pessoasServico.cadastrarConta(conta);
    }

    alterarConta(conta: Conta): Observable<any> {
        if (conta?.id) {
            return this._pessoasServico.alterarConta(conta);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a alteração da conta.',
                detalhes: 'Nao foi encontrado um [id] para realizar a ação.',
                fluxo: 'pessoas.usecase:alterarConta'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }

    removerConta(pessoaId: ID, bancoId: ID, contaId: ID): Observable<void> {
        if (pessoaId && bancoId && contaId) {
            return this._pessoasServico.removerConta(pessoaId, bancoId, contaId);
        } else {
            const erro = {
                mensagem: 'Ocorreu um erro durante a remoção da conta.',
                detalhes: 'Nao foi encontrado um [pessoaId], [bancoId], [contaId] para realizar a ação.',
                fluxo: 'pessoas.usecase:removerConta'
            };

            return throwError(() => new ErroNegocio(erro));
        }
    }
}
